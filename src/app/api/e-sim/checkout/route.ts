import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { userController } from "@/backend/controllers/user.controller";
import { EsimOrder } from "@/backend/models/esimOrder.model";
import { connectDB } from "@/backend/config/db";
import { sendEmail } from "@/backend/utils/sendEmail";

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
            `eSIM ${country} – ${plan}`
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

        // 📧 email
        await sendEmail(
            user.email,
            "eSIM purchase successful",
            `Your eSIM order for ${country} (${plan}) was successful.`,
            `
        <h2>eSIM Order Confirmed ✅</h2>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Plan:</strong> ${plan}</p>
        <p><strong>Tokens spent:</strong> ${tokens}</p>
        <p>Your QR code will be sent shortly.</p>
      `
        );

        return NextResponse.json({ success: true, order });
    } catch (err: any) {
        return NextResponse.json(
            { message: err.message || "Checkout failed" },
            { status: 400 }
        );
    }
}
