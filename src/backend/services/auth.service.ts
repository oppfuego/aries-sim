import bcrypt from "bcryptjs";
import { Types } from "mongoose";

import { User } from "../models/user.model";
import { RefreshSession } from "../models/refreshSession.model";
import { sha256, randomToken } from "../utils/crypto";
import { signAccessToken, signRefreshToken } from "../utils/jwt";
import { ENV } from "../config/env";
import { emailService } from "@/backend/services/email.service";
import { allowedRegistrationCountryNames } from "@/resources/countries";

function parseDurationToSec(input: string): number {
    const m = input.match(/^(\d+)([smhd])?$/i);
    if (!m) return 60 * 60 * 24 * 30;

    const n = parseInt(m[1], 10);
    const unit = (m[2] || "s").toLowerCase();
    const mult = unit === "s" ? 1 : unit === "m" ? 60 : unit === "h" ? 3600 : 86400;

    return n * mult;
}

const REFRESH_TTL_SEC = parseDurationToSec(ENV.REFRESH_TOKEN_EXPIRES);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RegisterPayload = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    dateOfBirth: string;
    street: string;
    city: string;
    country: string;
    postCode: string;
};

function trim(value: string | undefined | null) {
    return String(value || "").trim();
}

function normalizeRegisterData(data: RegisterPayload) {
    return {
        firstName: trim(data.firstName),
        lastName: trim(data.lastName),
        email: trim(data.email).toLowerCase(),
        password: data.password,
        phoneNumber: trim(data.phoneNumber),
        dateOfBirth: trim(data.dateOfBirth),
        street: trim(data.street),
        city: trim(data.city),
        country: trim(data.country),
        postCode: trim(data.postCode),
    };
}

function validateRegisterData(data: ReturnType<typeof normalizeRegisterData>) {
    if (!data.firstName) throw new Error("First name is required");
    if (!data.lastName) throw new Error("Last name is required");
    if (!data.email) throw new Error("Email is required");
    if (!EMAIL_REGEX.test(data.email)) throw new Error("Invalid email");
    if (!data.password) throw new Error("Password is required");
    if (!data.phoneNumber) throw new Error("Phone number is required");
    if (!data.street) throw new Error("Street is required");
    if (!data.city) throw new Error("City is required");
    if (!data.postCode) throw new Error("Post code is required");
    if (!data.country) throw new Error("Country is required");
    if (!allowedRegistrationCountryNames.has(data.country)) {
        throw new Error("Registration from this country is not allowed");
    }

    const date = new Date(data.dateOfBirth);
    if (!data.dateOfBirth || Number.isNaN(date.getTime())) {
        throw new Error("Invalid date of birth");
    }

    return date;
}

export const authService = {
    async register(data: RegisterPayload) {
        const normalized = normalizeRegisterData(data);
        const dateOfBirth = validateRegisterData(normalized);

        const existing = await User.findOne({ email: normalized.email });
        if (existing) throw new Error("Email already registered");

        const hashed = await bcrypt.hash(data.password, 12);

        const user = await User.create({
            firstName: normalized.firstName,
            lastName: normalized.lastName,
            email: normalized.email,
            password: hashed,
            phoneNumber: normalized.phoneNumber,
            dateOfBirth,
            street: normalized.street,
            city: normalized.city,
            country: normalized.country,
            postCode: normalized.postCode,
            phone: normalized.phoneNumber,
            birthDate: dateOfBirth,
            address: {
                street: normalized.street,
                city: normalized.city,
                country: normalized.country,
                zip: normalized.postCode,
            },
        });

        const result = await this.issueTokensAndSession(
            user._id,
            user.email,
            user.role
        );

        try {
            await emailService.sendWelcomeEmail({
                email: user.email,
                firstName: user.firstName,
            });
        } catch (error) {
            console.error("❌ Welcome email failed:", error);
        }

        return { user, ...result };
    },

    async login(email: string, password: string, userAgent?: string, ip?: string) {
        const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({ email: normalizedEmail }).select("+password");
        if (!user) throw new Error("Invalid credentials");

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error("Invalid credentials");

        await RefreshSession.deleteMany({ userId: user._id });

        const result = await this.issueTokensAndSession(
            user._id,
            user.email,
            user.role,
            userAgent,
            ip
        );

        console.log(`[authService.login] ✅ New login for ${user.email}, old sessions cleared.`);

        return { user, ...result };
    },

    async issueTokensAndSession(
        userId: Types.ObjectId,
        email: string,
        role: string,
        userAgent?: string,
        ip?: string
    ) {
        const rawRefresh = randomToken(64);
        const tokenHash = sha256(rawRefresh);

        const expiresAt = new Date(Date.now() + REFRESH_TTL_SEC * 1000);

        const session = await RefreshSession.create({
            userId,
            tokenHash,
            userAgent,
            ip,
            expiresAt,
        });

        const accessToken = await signAccessToken({
            sub: userId.toString(),
            email,
            role,
        });

        const refreshJWT = await signRefreshToken(
            { sub: userId.toString(), sid: (session as any)._id.toString() },
            ENV.REFRESH_TOKEN_EXPIRES
        );

        return { accessToken, refreshToken: refreshJWT, session };
    },

    async refresh(refreshJWT: string, userAgent?: string, ip?: string) {
        const { verifyRefreshToken } = await import("../utils/jwt");

        let payload: { sub: string; sid: string };

        try {
            payload = await verifyRefreshToken(refreshJWT);
        } catch {
            throw new Error("SessionInvalid");
        }

        const session = await RefreshSession.findById(payload.sid);
        if (!session || session.revokedAt || session.expiresAt.getTime() < Date.now()) {
            throw new Error("SessionInvalid");
        }

        session.revokedAt = new Date();
        await session.save();

        const user = await User.findById(session.userId);
        if (!user) throw new Error("UserNotFound");

        const { accessToken, refreshToken } = await this.issueTokensAndSession(
            user._id,
            user.email,
            user.role,
            userAgent,
            ip
        );

        return { user, accessToken, refreshToken };
    },

    async me(userId: string) {
        const user = await User.findById(userId).select("-password");
        if (!user) throw new Error("UserNotFound");
        return user;
    },

    async logout(refreshJWT: string) {
        const { verifyRefreshToken } = await import("../utils/jwt");

        try {
            const payload = await verifyRefreshToken<{ sub: string; sid: string }>(refreshJWT);
            await RefreshSession.findByIdAndUpdate(payload.sid, {
                $set: { revokedAt: new Date() },
            });
        } catch {
            // idempotent
        }
    },

    async logoutAll(userId: string) {
        await RefreshSession.updateMany(
            { userId },
            { $set: { revokedAt: new Date() } }
        );
    },
};
