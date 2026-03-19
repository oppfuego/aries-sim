import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { userController } from "@/backend/controllers/user.controller";
import { EsimOrder } from "@/backend/models/esimOrder.model";
import { connectDB } from "@/backend/config/db";
import { emailService } from "@/backend/services/email.service";

export async function POST(req: NextRequest) {
    try {
        const payload = await requireAuth(req);
        const body = await req.json();

        const { country, code, plan, tokens } = body;

        if (!country || !code || !plan || !tokens) {
            return NextResponse.json({ message: "Invalid data" }, { status: 400 });
        }

        await connectDB();

        // 💸 списуємо токени
        const user = await userController.spendTokens(
            payload.sub,
            tokens,
            `eSIM ${country} – ${plan}`,
            false
        );

        // 🧾 запис покупки
        const order = await EsimOrder.create({
            userId: payload.sub,
            email: user.email,
            country,
            countryCode: code,
            plan,
            tokensUsed: tokens,
        });

        emailService.sendOrderConfirmationEmail({
            email: user.email,
            firstName: user.firstName,
            subject: "eSIM order confirmed",
            summary: "Your eSIM order was completed successfully.",
            items: [`eSIM plan: ${plan}`, `Country: ${country}`],
            amountLabel: "Tokens used",
            amountValue: `${tokens} tokens`,
            transactionDate: order.createdAt,
        }).catch((error) => {
            console.error("❌ eSIM confirmation email failed:", error);
        });

        return NextResponse.json({ success: true, order });
    } catch (err: any) {
        return NextResponse.json(
            { message: err.message || "Checkout failed" },
            { status: 400 }
        );
    }
}
