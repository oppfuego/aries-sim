import { writeFile, readFile } from "fs/promises";
import { join } from "path";

const LOG_PATH = join(process.cwd(), "madfin-payments.log.json");

interface PaymentLogEntry {
    timestamp: string;
    event: string;
    orderMerchantId: string | null;
    orderSystemId: string | null;
    state: string | null;
    errorCode: string | null;
    errorMessage: string | null;
    request?: Record<string, unknown>;
    response?: Record<string, unknown>;
    meta?: Record<string, unknown>;
}

export async function logPaymentEvent(entry: PaymentLogEntry) {
    try {
        let logs: PaymentLogEntry[] = [];
        try {
            const raw = await readFile(LOG_PATH, "utf-8");
            logs = JSON.parse(raw);
        } catch {
            // file doesn't exist yet
        }

        logs.push(entry);

        await writeFile(LOG_PATH, JSON.stringify(logs, null, 2), "utf-8");
    } catch (err) {
        console.error("[Madfin Logger] Failed to write log:", err);
    }
}
