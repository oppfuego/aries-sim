import { connectDB } from "../config/db";
import { authService } from "../services/auth.service";
import { LogoutResponse } from "@/backend/types/auth.types";
import { UserType } from "@/backend/types/user.types";

export const authController = {
    async register(body: any) {
        await connectDB();
        const { user, accessToken, refreshToken } =
            await authService.register(body);

        return {
            user: {
                _id: user._id.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber || user.phone,
                dateOfBirth: user.dateOfBirth || user.birthDate,
                street: user.street || user.address?.street || "",
                city: user.city || user.address?.city || "",
                country: user.country || user.address?.country || "",
                postCode: user.postCode || user.address?.zip || "",
                phone: user.phone,
                birthDate: user.birthDate,
                address: user.address,
                role: user.role,
                tokens: user.tokens,
                createdAt: user.createdAt,
            },
            tokens: { accessToken, refreshToken },
        };
    },


    async login(body: { email: string; password: string }, userAgent?: string, ip?: string) {
        await connectDB();
        const { user, accessToken, refreshToken } = await authService.login(body.email, body.password, userAgent, ip);
        return { user: toUser(user), tokens: { accessToken, refreshToken } };
    },

    async refresh(refreshJWT: string, userAgent?: string, ip?: string) {
        await connectDB();
        const { user, accessToken, refreshToken } = await authService.refresh(refreshJWT, userAgent, ip);
        return { user: toUser(user), tokens: { accessToken, refreshToken } };
    },

    async me(userId: string): Promise<UserType> {
        await connectDB();
        const user = await authService.me(userId);
        return toUser(user);
    },

    async logout(refreshJWT: string): Promise<LogoutResponse> {
        await connectDB();
        await authService.logout(refreshJWT);
        return { message: "Logged out successfully" };
    },

    async logoutAll(userId: string): Promise<LogoutResponse> {
        await connectDB();
        await authService.logoutAll(userId);
        return { message: "All sessions revoked" };
    },
};

function toUser(u: any): UserType {
    const phoneNumber = u.phoneNumber || u.phone;
    const dateOfBirth = u.dateOfBirth || u.birthDate;
    const street = u.street || u.address?.street || "";
    const city = u.city || u.address?.city || "";
    const country = u.country || u.address?.country || "";
    const postCode = u.postCode || u.address?.zip || "";

    return {
        _id: u._id.toString(),

        firstName: u.firstName,
        lastName: u.lastName,

        email: u.email,
        phoneNumber,
        dateOfBirth,
        street,
        city,
        country,
        postCode,
        phone: u.phone || phoneNumber,
        birthDate: u.birthDate || dateOfBirth,

        address: {
            street,
            city,
            country,
            zip: u.address?.zip || postCode,
        },

        role: u.role,
        tokens: u.tokens,

        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
    };
}
