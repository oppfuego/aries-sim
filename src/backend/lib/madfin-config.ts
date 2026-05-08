export type MadfinCurrency = "GBP" | "EUR" | "USD";

export interface MadfinConfig {
    baseUrl: string;
    apiKey: string;
    signingKey: string;
    descriptor: string;
    mcc: string;
}

export function getMadfinConfig(): MadfinConfig {
    return {
        baseUrl: process.env.MADFIN_BASE_URL || "https://engine.madfin.tech",
        apiKey: process.env.MADFIN_API_KEY || "",
        signingKey: process.env.MADFIN_SIGNING_KEY || "",
        descriptor: process.env.MADFIN_DESCRIPTOR || "ariesonline",
        mcc: process.env.MADFIN_MCC || "4814",
    };
}
