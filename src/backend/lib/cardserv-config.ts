export type CardServCurrency = "GBP" | "EUR" | "USD";

export interface CardServConfig {
    baseUrl: string;
    requestorId: string;
    bearerToken: string;
    signingKey: string;
    apiKey: string;
    descriptor: string;
    mcc: string;
}

export function getCardServConfig(): CardServConfig {
    return {
        baseUrl: process.env.CARDSERV_BASE_URL || "https://test.cardserv.io",
        requestorId: process.env.CARDSERV_REQUESTOR_ID || "853",
        bearerToken: process.env.CARDSERV_BEARER_TOKEN || "",
        signingKey: process.env.CARDSERV_SIGNING_KEY || "",
        apiKey: process.env.CARDSERV_API_KEY || "",
        descriptor: process.env.CARDSERV_DESCRIPTOR || "ariesonline",
        mcc: process.env.CARDSERV_MCC || "4814",
    };
}
