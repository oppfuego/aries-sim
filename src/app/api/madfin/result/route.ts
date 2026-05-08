import { NextResponse } from "next/server";
import { connectDB } from "@/backend/config/db";
import { PaymentOrder } from "@/backend/models/paymentOrder.model";
import { getMadfinStatus } from "@/backend/lib/madfin";
import { logPaymentEvent } from "@/backend/lib/madfin-logger";
import { userController } from "@/backend/controllers/user.controller";

function getAppUrl(req: Request): string {
    const url = new URL(req.url);
    const host = req.headers.get("host") || url.host;
    const isLocalhost = host.startsWith("localhost") || host.startsWith("127.0.0.1");

    if (isLocalhost) {
        return `${url.protocol}//${host}`;
    }

    const envUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL;
    if (envUrl) return envUrl.replace(/\/$/, "");

    return `${url.protocol}//${host}`;
}

function extractIdentifiers(req: Request, form?: FormData) {
    const url = new URL(req.url);
    const { searchParams, pathname } = url;
    const pathParts = pathname.split("/").filter(Boolean);

    const pathOrder =
        pathParts.length >= 4 &&
        pathParts[0] === "api" &&
        pathParts[1] === "madfin" &&
        pathParts[2] === "result"
            ? decodeURIComponent(pathParts[3] || "")
            : null;

    const orderMerchantId =
        pathOrder ||
        searchParams.get("referenceId") ||
        searchParams.get("order") ||
        searchParams.get("orderId") ||
        searchParams.get("orderMerchantId") ||
        form?.get("MD")?.toString() ||
        form?.get("threeDSSessionData")?.toString() ||
        form?.get("order")?.toString() ||
        form?.get("orderId")?.toString() ||
        null;

    const madfinPaymentId = searchParams.get("id") || null;

    return { orderMerchantId, madfinPaymentId };
}

async function handleResult(req: Request, form?: FormData) {
    await connectDB();
    const { orderMerchantId, madfinPaymentId } = extractIdentifiers(req, form);
    const appUrl = getAppUrl(req);

    if (!orderMerchantId && !madfinPaymentId) {
        return NextResponse.redirect(`${appUrl}/payment-failed?reason=missing_order`, 302);
    }

    const order = orderMerchantId
        ? await PaymentOrder.findOne({ orderMerchantId })
        : await PaymentOrder.findOne({ orderSystemId: madfinPaymentId });

    if (!order) {
        return NextResponse.redirect(
            `${appUrl}/payment-failed?reason=order_not_found&order=${encodeURIComponent(orderMerchantId || madfinPaymentId || "")}`,
            302,
        );
    }

    const effectiveOrderMerchantId = order.orderMerchantId;

    const status = await getMadfinStatus(effectiveOrderMerchantId, order.orderSystemId);

    await logPaymentEvent({
        timestamp: new Date().toISOString(),
        event: "result.status_check",
        orderMerchantId: effectiveOrderMerchantId,
        orderSystemId: status.orderSystemId,
        state: status.orderState,
        errorCode: status.errorCode,
        errorMessage: status.errorMessage,
        response: status.raw,
        meta: {
            lookupBy: orderMerchantId ? "orderMerchantId" : "madfinPaymentId",
            lookupValue: orderMerchantId || madfinPaymentId,
            tokens: order.tokens,
            creditedTokens: order.creditedTokens,
        },
    });

    const updateData: Record<string, unknown> = {
        status: status.orderState,
        gatewayResponse: status.raw,
    };
    if (status.orderSystemId) updateData.orderSystemId = status.orderSystemId;

    await PaymentOrder.updateOne({ orderMerchantId: effectiveOrderMerchantId }, updateData);

    if (status.orderState === "APPROVED" && order.creditedTokens === 0) {
        await userController.buyTokens(order.userId.toString(), order.tokens);
        await PaymentOrder.updateOne({ orderMerchantId: effectiveOrderMerchantId }, { creditedTokens: order.tokens });

        await logPaymentEvent({
            timestamp: new Date().toISOString(),
            event: "result.tokens_credited",
            orderMerchantId: effectiveOrderMerchantId,
            orderSystemId: status.orderSystemId,
            state: "APPROVED",
            errorCode: null,
            errorMessage: null,
            meta: { tokensCredited: order.tokens, userId: order.userId.toString() },
        });
    }

    if (["DECLINED", "ERROR", "FILTERED", "CANCELLED"].includes(status.orderState)) {
        return NextResponse.redirect(
            `${appUrl}/payment-failed?order=${encodeURIComponent(effectiveOrderMerchantId)}&reason=${encodeURIComponent(status.errorMessage || status.orderState)}`,
            302,
        );
    }

    return NextResponse.redirect(
        `${appUrl}/payment-success?order=${encodeURIComponent(effectiveOrderMerchantId)}`,
        302,
    );
}

export async function POST(req: Request) {
    try {
        const form = await req.formData().catch(() => undefined);
        return await handleResult(req, form);
    } catch (err: unknown) {
        const appUrl = getAppUrl(req);
        const message = err instanceof Error ? err.message : "result_error";
        console.error("Madfin result POST error:", message);
        return NextResponse.redirect(`${appUrl}/payment-failed?reason=${encodeURIComponent(message)}`, 302);
    }
}

export async function GET(req: Request) {
    try {
        return await handleResult(req);
    } catch (err: unknown) {
        const appUrl = getAppUrl(req);
        const message = err instanceof Error ? err.message : "result_error";
        console.error("Madfin result GET error:", message);
        return NextResponse.redirect(`${appUrl}/payment-failed?reason=${encodeURIComponent(message)}`, 302);
    }
}
