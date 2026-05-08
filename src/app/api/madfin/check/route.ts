import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/backend/config/db";
import { PaymentOrder } from "@/backend/models/paymentOrder.model";
import { getMadfinStatus } from "@/backend/lib/madfin";
import { logPaymentEvent } from "@/backend/lib/madfin-logger";
import { userController } from "@/backend/controllers/user.controller";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);

        const id = searchParams.get("id");
        const referenceId = searchParams.get("referenceId");

        if (!id && !referenceId) {
            return NextResponse.json({ ok: false, error: "Missing payment identifier" }, { status: 400 });
        }

        const order = referenceId
            ? await PaymentOrder.findOne({ orderMerchantId: referenceId })
            : await PaymentOrder.findOne({ orderSystemId: id });

        if (!order) {
            const orderByMerchant = id ? await PaymentOrder.findOne({ orderMerchantId: id }) : null;
            if (!orderByMerchant) {
                return NextResponse.json({ ok: false, error: "Order not found" }, { status: 404 });
            }
            return await processOrder(orderByMerchant);
        }

        return await processOrder(order);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Status check failed";
        console.error("Madfin check error:", message);
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function processOrder(order: any) {
    const status = await getMadfinStatus(order.orderMerchantId, order.orderSystemId);

    await logPaymentEvent({
        timestamp: new Date().toISOString(),
        event: "check.status",
        orderMerchantId: order.orderMerchantId,
        orderSystemId: status.orderSystemId,
        state: status.orderState,
        errorCode: status.errorCode,
        errorMessage: status.errorMessage,
        response: status.raw,
    });

    const updateData: Record<string, unknown> = {
        status: status.orderState,
        gatewayResponse: status.raw,
    };
    if (status.orderSystemId) updateData.orderSystemId = status.orderSystemId;

    await PaymentOrder.updateOne({ orderMerchantId: order.orderMerchantId }, updateData);

    let tokensAdded = 0;
    if (status.orderState === "APPROVED" && order.creditedTokens === 0) {
        await userController.buyTokens(order.userId.toString(), order.tokens);
        await PaymentOrder.updateOne(
            { orderMerchantId: order.orderMerchantId },
            { creditedTokens: order.tokens },
        );
        tokensAdded = order.tokens;

        await logPaymentEvent({
            timestamp: new Date().toISOString(),
            event: "check.tokens_credited",
            orderMerchantId: order.orderMerchantId,
            orderSystemId: status.orderSystemId,
            state: "APPROVED",
            errorCode: null,
            errorMessage: null,
            meta: { tokensCredited: order.tokens, userId: order.userId.toString() },
        });
    }

    return NextResponse.json({
        ok: true,
        orderMerchantId: order.orderMerchantId,
        state: status.orderState,
        tokens: order.tokens,
        tokensAdded,
        errorCode: status.errorCode,
        errorMessage: status.errorMessage,
        packageName: order.packageName,
        currency: order.currency,
        amount: order.amountGross,
    });
}
