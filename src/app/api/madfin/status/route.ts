import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { connectDB } from "@/backend/config/db";
import { PaymentOrder } from "@/backend/models/paymentOrder.model";
import { getMadfinStatus } from "@/backend/lib/madfin";

export async function POST(req: NextRequest) {
    try {
        const auth = await requireAuth(req);
        await connectDB();

        const { orderMerchantId } = await req.json();
        if (!orderMerchantId || orderMerchantId.length < 4) {
            return NextResponse.json({ message: "Invalid orderMerchantId" }, { status: 400 });
        }

        const order = await PaymentOrder.findOne({ orderMerchantId });
        if (!order || order.userId.toString() !== auth.sub) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        const status = await getMadfinStatus(orderMerchantId, order.orderSystemId);

        await PaymentOrder.updateOne(
            { orderMerchantId },
            {
                status: status.orderState,
                orderSystemId: status.orderSystemId || order.orderSystemId,
                gatewayResponse: status.raw,
            },
        );

        return NextResponse.json({
            ok: true,
            orderMerchantId,
            orderSystemId: status.orderSystemId,
            state: status.orderState,
            redirectUrl: status.redirectUrl,
            errorCode: status.errorCode,
            errorMessage: status.errorMessage,
            tokens: order.tokens,
            creditedTokens: order.creditedTokens,
        });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to fetch payment status";
        return NextResponse.json({ message }, { status: 400 });
    }
}
