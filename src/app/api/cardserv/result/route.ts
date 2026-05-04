import { NextResponse } from "next/server";
import { connectDB } from "@/backend/config/db";
import { PaymentOrder } from "@/backend/models/paymentOrder.model";
import { getCardServStatus } from "@/backend/lib/cardserv";
import { userController } from "@/backend/controllers/user.controller";

function getAppUrl(req: Request): string {
    const envUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL;
    if (envUrl) return envUrl.replace(/\/$/, "");

    const url = new URL(req.url);
    return `${url.protocol}//${url.host}`;
}

function extractOrderMerchantId(req: Request, form?: FormData): string | null {
    const url = new URL(req.url);
    const { searchParams, pathname } = url;
    const pathParts = pathname.split("/").filter(Boolean);

    const pathOrder =
        pathParts.length >= 4 &&
        pathParts[0] === "api" &&
        pathParts[1] === "cardserv" &&
        pathParts[2] === "result"
            ? decodeURIComponent(pathParts[3] || "")
            : null;

    return (
        pathOrder ||
        form?.get("MD")?.toString() ||
        form?.get("threeDSSessionData")?.toString() ||
        searchParams.get("order") ||
        searchParams.get("orderId") ||
        searchParams.get("orderMerchantId") ||
        form?.get("order")?.toString() ||
        form?.get("orderId")?.toString() ||
        null
    );
}

async function handleResult(req: Request, form?: FormData) {
    await connectDB();
    const orderMerchantId = extractOrderMerchantId(req, form);
    const appUrl = getAppUrl(req);

    if (!orderMerchantId) {
        return NextResponse.redirect(`${appUrl}/payment-failed?reason=missing_order`, 302);
    }

    const order = await PaymentOrder.findOne({ orderMerchantId });
    if (!order) {
        return NextResponse.redirect(
            `${appUrl}/payment-failed?reason=order_not_found&order=${encodeURIComponent(orderMerchantId)}`,
            302,
        );
    }

    const status = await getCardServStatus(orderMerchantId, order.orderSystemId);

    const updateData: Record<string, unknown> = {
        status: status.orderState,
        gatewayResponse: status.raw,
    };
    if (status.orderSystemId) updateData.orderSystemId = status.orderSystemId;

    await PaymentOrder.updateOne({ orderMerchantId }, updateData);

    if (status.orderState === "APPROVED" && order.creditedTokens === 0) {
        await userController.buyTokens(order.userId.toString(), order.tokens);
        await PaymentOrder.updateOne({ orderMerchantId }, { creditedTokens: order.tokens });
    }

    if (["DECLINED", "ERROR", "FILTERED", "CHAIN_STEP"].includes(status.orderState)) {
        return NextResponse.redirect(
            `${appUrl}/payment-failed?order=${encodeURIComponent(orderMerchantId)}&reason=${encodeURIComponent(status.errorMessage || status.orderState)}`,
            302,
        );
    }

    return NextResponse.redirect(
        `${appUrl}/payment-success?order=${encodeURIComponent(orderMerchantId)}`,
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
        console.error("CardServ result POST error:", message);
        return NextResponse.redirect(`${appUrl}/payment-failed?reason=${encodeURIComponent(message)}`, 302);
    }
}

export async function GET(req: Request) {
    try {
        return await handleResult(req);
    } catch (err: unknown) {
        const appUrl = getAppUrl(req);
        const message = err instanceof Error ? err.message : "result_error";
        console.error("CardServ result GET error:", message);
        return NextResponse.redirect(`${appUrl}/payment-failed?reason=${encodeURIComponent(message)}`, 302);
    }
}
