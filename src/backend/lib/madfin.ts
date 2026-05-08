import { createHmac } from "crypto";
import { getMadfinConfig, type MadfinCurrency } from "./madfin-config";

export interface SalePayload {
    orderMerchantId: string;
    amountGross: number;
    currency: MadfinCurrency;
    description: string;
    email: string;
    customerName: string;
    countryCode: string;
    appUrl: string;
    card?: {
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

export interface SaleResult {
    orderSystemId: string | null;
    orderState: string;
    redirectUrl: string | null;
    errorCode: string | null;
    errorMessage: string | null;
    raw: Record<string, unknown>;
}

export async function createMadfinPayment(payload: SalePayload): Promise<SaleResult> {
    const config = getMadfinConfig();
    const [firstName, ...lastParts] = payload.customerName.split(" ");
    const lastName = lastParts.join(" ") || firstName;

    const body: Record<string, unknown> = {
        referenceId: payload.orderMerchantId,
        paymentType: "DEPOSIT",
        paymentMethod: "BASIC_CARD",
        amount: payload.amountGross,
        currency: payload.currency,
        description: payload.description,
        customer: {
            firstName,
            lastName,
            email: payload.email,
            citizenshipCountryCode: payload.countryCode,
            ip: payload.browser.ipAddress,
        },
        billingAddress: {
            countryCode: payload.countryCode,
        },
        returnUrl: `${payload.appUrl}/result?referenceId=${encodeURIComponent(payload.orderMerchantId)}`,
        webhookUrl: `${payload.appUrl}/api/madfin/webhook`,
    };

    if (payload.card) {
        const expireYear = payload.card.expireYear.length === 2
            ? `20${payload.card.expireYear}`
            : payload.card.expireYear;

        body.card = {
            cardNumber: payload.card.cardNumber,
            cardholderName: payload.card.cardPrintedName,
            cardSecurityCode: payload.card.cvv2,
            expiryMonth: payload.card.expireMonth.padStart(2, "0"),
            expiryYear: expireYear,
        };
    }

    console.log("[Madfin] Sale request:", JSON.stringify(body, null, 2));
    console.log("[Madfin] URL:", `${config.baseUrl}/api/v1/payments`);

    const res = await fetch(
        `${config.baseUrl}/api/v1/payments`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${config.apiKey}`,
            },
            body: JSON.stringify(body),
        },
    );

    const data = await res.json();
    console.log("[Madfin] Sale response:", JSON.stringify(data, null, 2));

    const result = data.result ?? data;

    return {
        orderSystemId: result.id ?? null,
        orderState: mapMadfinState(result.state ?? "PENDING"),
        redirectUrl: result.redirectUrl ?? null,
        errorCode: result.errorCode ?? null,
        errorMessage: result.errorMessage ?? null,
        raw: data,
    };
}

export async function getMadfinStatus(
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
    const config = getMadfinConfig();

    if (!orderSystemId) {
        return {
            orderState: "UNKNOWN",
            orderSystemId: null,
            redirectUrl: null,
            errorCode: null,
            errorMessage: "No payment ID available for status check",
            raw: {},
        };
    }

    const res = await fetch(
        `${config.baseUrl}/api/v1/payments/${orderSystemId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${config.apiKey}`,
            },
        },
    );

    const data = await res.json();
    const result = data.result ?? data;

    return {
        orderState: mapMadfinState(result.state ?? "UNKNOWN"),
        orderSystemId: result.id ?? orderSystemId,
        redirectUrl: result.redirectUrl ?? null,
        errorCode: result.errorCode ?? null,
        errorMessage: result.errorMessage ?? null,
        raw: data,
    };
}

export function parseMadfinWebhookPayload(payload: Record<string, unknown>) {
    return {
        orderState: mapMadfinState((payload.state as string) ?? "UNKNOWN"),
        orderSystemId: (payload.id as string) ?? null,
        redirectUrl: (payload.redirectUrl as string) ?? null,
        errorCode: (payload.errorCode as string) ?? null,
        errorMessage: (payload.errorMessage as string) ?? null,
    };
}

export function readMadfinWebhookOrderId(payload: Record<string, unknown>): string | null {
    return (payload.referenceId as string) ?? null;
}

export function verifyWebhookSignature(rawBody: string, signature: string | null): boolean {
    if (!signature) return false;
    const config = getMadfinConfig();
    const expected = createHmac("sha256", config.signingKey)
        .update(rawBody)
        .digest("hex");
    return expected === signature;
}

function mapMadfinState(state: string): string {
    switch (state) {
        case "COMPLETED":
            return "APPROVED";
        case "DECLINED":
            return "DECLINED";
        case "CANCELLED":
            return "CANCELLED";
        case "AUTHORIZED":
            return "AUTHORIZED";
        case "PENDING":
        case "IN_PROGRESS":
            return "PROCESSING";
        default:
            return state;
    }
}
