import { createHmac } from "crypto";
import { getCardServConfig, type CardServCurrency } from "./cardserv-config";

interface SalePayload {
    orderMerchantId: string;
    amountGross: number;
    currency: CardServCurrency;
    description: string;
    email: string;
    customerName: string;
    countryCode: string;
    appUrl: string;
    card: {
        cardNumber: string;
        cvv2: string;
        expireMonth: string;
        expireYear: string;
        cardPrintedName: string;
    };
    browser: {
        ipAddress: string;
        acceptHeader: string;
        colorDepth?: number;
        screenHeight?: number;
        screenWidth?: number;
        timeZone?: number;
        javaEnabled?: boolean;
        javascriptEnabled?: boolean;
        acceptLanguage?: string;
        userAgent?: string;
    };
}

interface SaleResult {
    orderSystemId: string | null;
    orderState: string;
    redirectUrl: string | null;
    errorCode: string | null;
    errorMessage: string | null;
    raw: Record<string, unknown>;
}

export async function createCardServRedirectSession(payload: SalePayload): Promise<SaleResult> {
    const config = getCardServConfig();
    const [firstName, ...lastParts] = payload.customerName.split(" ");
    const lastName = lastParts.join(" ") || firstName;

    const body = {
        order: {
            orderMerchantId: payload.orderMerchantId,
            orderDescription: payload.description,
            orderAmount: String(payload.amountGross),
            orderCurrencyCode: "EUR",
        },
        card: {
            cardNumber: payload.card.cardNumber,
            cvv2: payload.card.cvv2,
            expireMonth: payload.card.expireMonth,
            expireYear: payload.card.expireYear,
            cardPrintedName: payload.card.cardPrintedName,
        },
        browser: {
            ipAddress: payload.browser.ipAddress,
            acceptHeader: payload.browser.acceptHeader && payload.browser.acceptHeader.length >= 10
                ? payload.browser.acceptHeader
                : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            colorDepth: payload.browser.colorDepth ?? 32,
            javascriptEnabled: payload.browser.javascriptEnabled ?? true,
            acceptLanguage: payload.browser.acceptLanguage || "en-US",
            screenHeight: payload.browser.screenHeight ?? 1080,
            screenWidth: payload.browser.screenWidth ?? 1920,
            timeZone: payload.browser.timeZone ?? -180,
            userAgent: payload.browser.userAgent || "Mozilla/5.0",
            javaEnabled: payload.browser.javaEnabled ?? false,
        },
        customer: {
            firstname: firstName,
            lastname: lastName,
            customerEmail: payload.email,
            address: {
                countryCode: payload.countryCode,
            },
        },
        urls: {
            resultUrl: `${payload.appUrl}/api/cardserv/result`,
            cresUrl: `${payload.appUrl}/api/cardserv/cres`,
            webhookUrl: `${payload.appUrl}/api/cardserv/webhook`,
            redirectWebhookUrl: `${payload.appUrl}/api/cardserv/redirect-webhook`,
        },
        feature: {
            redirectUrlCreation: "CREATE_IN_RESPONSE",
        },
    };

    console.log("[CardServ] Sale request:", JSON.stringify(body, null, 2));
    console.log("[CardServ] Auth: Bearer", config.bearerToken.slice(0, 10) + "...");
    console.log("[CardServ] URL:", `${config.baseUrl}/api/payments/sale/${config.requestorId}`);

    const res = await fetch(
        `${config.baseUrl}/api/payments/sale/${config.requestorId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${config.bearerToken}`,
            },
            body: JSON.stringify(body),
        },
    );

    const data = await res.json();
    console.log("[CardServ] Sale response:", JSON.stringify(data, null, 2));

    return {
        orderSystemId: data.orderSystemId ?? null,
        orderState: data.orderState ?? "PROCESSING",
        redirectUrl: data.outputRedirectToUrl ?? data.redirectUrl ?? null,
        errorCode: data.errorCode ?? null,
        errorMessage: data.errorMessage ?? null,
        raw: data,
    };
}

export async function getCardServStatus(
    orderMerchantId: string,
    orderSystemId: string | null,
): Promise<{
    orderState: string;
    orderSystemId: string | null;
    redirectUrl: string | null;
    errorCode: string | null;
    errorMessage: string | null;
    raw: Record<string, unknown>;
}> {
    const config = getCardServConfig();

    const body: Record<string, unknown> = { orderMerchantId };
    if (orderSystemId) body.orderSystemId = orderSystemId;

    const res = await fetch(
        `${config.baseUrl}/api/payments/status/${config.requestorId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${config.bearerToken}`,
            },
            body: JSON.stringify(body),
        },
    );

    const data = await res.json();

    return {
        orderState: data.orderState ?? "UNKNOWN",
        orderSystemId: data.orderSystemId ?? orderSystemId,
        redirectUrl: data.outputRedirectToUrl ?? null,
        errorCode: data.errorCode ?? null,
        errorMessage: data.errorMessage ?? null,
        raw: data,
    };
}

export function parseCardServWebhookPayload(payload: Record<string, unknown>) {
    return {
        orderState: (payload.orderState as string) ?? "UNKNOWN",
        orderSystemId: (payload.orderSystemId as string) ?? null,
        redirectUrl: (payload.outputRedirectToUrl as string) ?? null,
        errorCode: (payload.errorCode as string) ?? null,
        errorMessage: (payload.errorMessage as string) ?? null,
    };
}

export function readCardServWebhookOrderId(payload: Record<string, unknown>): string | null {
    return (payload.orderMerchantId as string) ?? null;
}

export function verifyWebhookSignature(rawBody: string, signature: string | null): boolean {
    if (!signature) return false;
    const config = getCardServConfig();
    const expected = createHmac("sha256", config.signingKey)
        .update(rawBody)
        .digest("hex");
    return expected === signature;
}
