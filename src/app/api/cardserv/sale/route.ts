import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { connectDB } from "@/backend/config/db";
import { PaymentOrder } from "@/backend/models/paymentOrder.model";
import { createCardServRedirectSession } from "@/backend/lib/cardserv";
import { userService } from "@/backend/services/user.service";

const TOKENS_PER_GBP = 100;
const RATES_TO_GBP: Record<string, number> = { GBP: 1, EUR: 1.17, USD: 1.29 };
const RATES_FROM_GBP_TO_EUR = 1.17;

function getAppUrl(req: NextRequest): string {
    const envUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL;
    if (envUrl) return envUrl.replace(/\/$/, "");

    const url = new URL(req.url);
    return `${url.protocol}//${url.host}`;
}

function normalizeIp(value: string | undefined | null): string {
    const trimmed = value?.trim();
    if (!trimmed || trimmed === "::1" || trimmed === "0:0:0:0:0:0:0:1") return "127.0.0.1";
    return trimmed;
}

export async function POST(req: NextRequest) {
    try {
        const auth = await requireAuth(req);
        await connectDB();

        const body = await req.json();
        const { title, price, tokens, currency, variant, card } = body;

        if (!title || !price || !tokens || !currency) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        if (!card?.cardNumber || !card?.cvv2 || !card?.expireMonth || !card?.expireYear || !card?.cardPrintedName) {
            return NextResponse.json({ message: "Missing card details" }, { status: 400 });
        }

        const supportedCurrencies = ["GBP", "EUR", "USD"];
        if (!supportedCurrencies.includes(currency)) {
            return NextResponse.json({ message: "Unsupported currency" }, { status: 400 });
        }

        const user = await userService.getUserById(auth.sub);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const amountNet = Number(price);
        const vatAmount = 0;
        const amountGross = amountNet;
        const gbpEquivalent = amountNet / (RATES_TO_GBP[currency] || 1);
        const finalTokens = variant === "custom"
            ? Math.floor(gbpEquivalent * TOKENS_PER_GBP)
            : tokens;

        const orderMerchantId = `cc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

        await PaymentOrder.create({
            userId: user._id,
            email: user.email,
            packageId: variant?.toUpperCase() || "CUSTOM",
            packageName: title,
            currency,
            amountNet,
            vatAmount,
            amountGross,
            tokens: finalTokens,
            status: "PENDING",
            orderMerchantId,
        });

        const forwardedFor = req.headers.get("x-forwarded-for");
        const browserIp = normalizeIp(
            body.browser?.ipAddress ||
            forwardedFor?.split(",")[0]?.trim() ||
            req.headers.get("x-real-ip"),
        );

        const countryCode = currency === "EUR" ? "DE" : currency === "GBP" ? "GB" : "US";
        const appUrl = getAppUrl(req);

        const gbpAmount = amountGross / (RATES_TO_GBP[currency] || 1);
        const amountInEUR = Math.round(gbpAmount * RATES_FROM_GBP_TO_EUR * 100) / 100;

        const sale = await createCardServRedirectSession({
            orderMerchantId,
            amountGross: amountInEUR,
            currency: "EUR",
            description: `${title} - ${finalTokens} tokens`,
            email: user.email,
            customerName: `${user.firstName} ${user.lastName}`,
            countryCode,
            appUrl,
            card: {
                cardNumber: card.cardNumber.replace(/\s/g, ""),
                cvv2: card.cvv2,
                expireMonth: card.expireMonth,
                expireYear: card.expireYear,
                cardPrintedName: card.cardPrintedName,
            },
            browser: {
                ipAddress: browserIp,
                acceptHeader: body.browser?.acceptHeader ||
                    req.headers.get("accept") ||
                    "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                colorDepth: body.browser?.colorDepth,
                screenHeight: body.browser?.screenHeight,
                screenWidth: body.browser?.screenWidth,
                timeZone: body.browser?.timeZone,
                javaEnabled: body.browser?.javaEnabled,
                javascriptEnabled: body.browser?.javascriptEnabled,
                acceptLanguage: body.browser?.acceptLanguage || req.headers.get("accept-language") || undefined,
                userAgent: body.browser?.userAgent || req.headers.get("user-agent") || undefined,
            },
        });

        if (sale.orderSystemId || sale.orderState !== "PENDING") {
            await PaymentOrder.updateOne(
                { orderMerchantId },
                {
                    orderSystemId: sale.orderSystemId,
                    status: sale.orderState,
                    gatewayResponse: sale.raw,
                },
            );
        }

        return NextResponse.json({
            ok: true,
            orderMerchantId,
            orderSystemId: sale.orderSystemId,
            state: sale.orderState,
            redirectUrl: sale.redirectUrl,
            errorCode: sale.errorCode,
            errorMessage: sale.errorMessage,
        });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to create payment";
        console.error("CardServ sale error:", message);
        return NextResponse.json({ message }, { status: 400 });
    }
}
