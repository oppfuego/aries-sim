import { NextResponse } from "next/server";
import { connectDB } from "@/backend/config/db";
import { PaymentOrder } from "@/backend/models/paymentOrder.model";
import { parseCardServWebhookPayload, readCardServWebhookOrderId } from "@/backend/lib/cardserv";
import { userController } from "@/backend/controllers/user.controller";

export async function POST(req: Request) {
    try {
        await connectDB();
        const payload = (await req.json().catch(() => ({}))) as Record<string, unknown>;
        const orderMerchantId = readCardServWebhookOrderId(payload);

        if (!orderMerchantId) {
            return NextResponse.json({ ok: false, error: "Missing orderMerchantId" }, { status: 400 });
        }

        const order = await PaymentOrder.findOne({ orderMerchantId });
        if (!order) {
            return NextResponse.json({ ok: false, error: "Order not found" }, { status: 404 });
        }

        const status = parseCardServWebhookPayload(payload);

        const updateData: Record<string, unknown> = {
            status: status.orderState,
            gatewayResponse: payload,
        };
        if (status.orderSystemId) updateData.orderSystemId = status.orderSystemId;

        await PaymentOrder.updateOne({ orderMerchantId }, updateData);

        let tokensAdded = 0;
        if (status.orderState === "APPROVED" && order.creditedTokens === 0) {
            await userController.buyTokens(order.userId.toString(), order.tokens);
            await PaymentOrder.updateOne({ orderMerchantId }, { creditedTokens: order.tokens });
            tokensAdded = order.tokens;
        }

        return NextResponse.json({
            ok: true,
            orderMerchantId,
            state: status.orderState,
            tokensAdded,
        });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Webhook processing failed";
        console.error("CardServ webhook error:", message);
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}
