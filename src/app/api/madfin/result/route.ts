import { NextResponse } from "next/server";

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

function buildRedirect(req: Request, form?: FormData): NextResponse {
    const url = new URL(req.url);
    const appUrl = getAppUrl(req);
    const params = new URLSearchParams();

    const id = url.searchParams.get("id");
    const referenceId =
        url.searchParams.get("referenceId") ||
        url.searchParams.get("order") ||
        url.searchParams.get("orderId") ||
        url.searchParams.get("orderMerchantId") ||
        form?.get("MD")?.toString() ||
        form?.get("threeDSSessionData")?.toString() ||
        null;

    if (id) params.set("id", id);
    if (referenceId) params.set("referenceId", referenceId);

    url.searchParams.forEach((value, key) => {
        if (!params.has(key)) params.set(key, value);
    });

    return NextResponse.redirect(`${appUrl}/result?${params.toString()}`, 302);
}

export async function GET(req: Request) {
    return buildRedirect(req);
}

export async function POST(req: Request) {
    const form = await req.formData().catch(() => undefined);
    return buildRedirect(req, form);
}
