import { connectDB } from "../config/db";
import { userService } from "../services/user.service";
import { UserType } from "@/backend/types/user.types";
import { transactionService } from "@/backend/services/transaction.service";
import { emailService } from "@/backend/services/email.service";

export const userController = {
    async buyTokens(userId: string, amount: number): Promise<UserType> {
        await connectDB();

        const user = await userService.addTokens(userId, amount);

        console.log("💳 Adding tokens for user:", userId);
        await transactionService.record(user._id, user.email, amount, "add", user.tokens);
        console.log("✅ Transaction created successfully");

        emailService.sendOrderConfirmationEmail({
            email: user.email,
            firstName: user.firstName,
            subject: "Token purchase confirmed",
            summary: "Your token purchase was completed successfully.",
            items: ["Token purchase"],
            amountLabel: "Tokens added",
            amountValue: `${amount} tokens`,
        }).catch((error) => {
            console.error("❌ Token purchase confirmation email failed:", error);
        });

        return formatUser(user);
    },

    async spendTokens(
        userId: string,
        amount: number,
        reason?: string,
        sendConfirmationEmail = true
    ): Promise<UserType> {
        await connectDB();

        const user = await userService.getUserById(userId);
        if (!user) throw new Error("User not found");
        if ((user.tokens || 0) < amount) throw new Error("Not enough tokens");

        user.tokens -= amount;
        await user.save();

        await transactionService.record(user._id, user.email, amount, "spend", user.tokens);

        if (sendConfirmationEmail) {
            emailService.sendOrderConfirmationEmail({
                email: user.email,
                firstName: user.firstName,
                subject: "Transaction confirmed",
                summary: `Your transaction was completed successfully${reason ? ` for ${reason}` : ""}.`,
                items: [reason || "Token spend"],
                amountLabel: "Tokens used",
                amountValue: `${amount} tokens`,
            }).catch((error) => {
                console.error("❌ Transaction confirmation email failed:", error);
            });
        }

        return formatUser(user);
    },
};

function formatUser(user: any): UserType {
    const phoneNumber = user.phoneNumber || user.phone;
    const dateOfBirth = user.dateOfBirth || user.birthDate;
    const street = user.street || user.address?.street || "";
    const city = user.city || user.address?.city || "";
    const country = user.country || user.address?.country || "";
    const postCode = user.postCode || user.address?.zip || "";

    return {
        _id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber,
        dateOfBirth,
        street,
        city,
        country,
        postCode,
        phone: user.phone || phoneNumber,
        birthDate: user.birthDate || dateOfBirth,
        address: {
            street,
            city,
            country,
            zip: user.address?.zip || postCode,
        },
        role: user.role,
        tokens: user.tokens,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
