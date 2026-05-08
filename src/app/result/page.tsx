"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import s from "./Result.module.scss";

interface PaymentResult {
    ok: boolean;
    orderMerchantId?: string;
    state?: string;
    tokens?: number;
    tokensAdded?: number;
    errorCode?: string | null;
    errorMessage?: string | null;
    packageName?: string;
    currency?: string;
    amount?: number;
    error?: string;
}

function ResultContent() {
    const searchParams = useSearchParams();
    const [result, setResult] = useState<PaymentResult | null>(null);
    const [loading, setLoading] = useState(true);

    const checkStatus = useCallback(async () => {
        const id = searchParams.get("id");
        const referenceId = searchParams.get("referenceId");

        if (!id && !referenceId) {
            setResult({ ok: false, error: "No payment identifier found in URL" });
            setLoading(false);
            return;
        }

        try {
            const params = new URLSearchParams();
            if (id) params.set("id", id);
            if (referenceId) params.set("referenceId", referenceId);

            const res = await fetch(`/api/madfin/check?${params.toString()}`);
            const data = await res.json();
            setResult(data);
        } catch {
            setResult({ ok: false, error: "Failed to check payment status" });
        } finally {
            setLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        checkStatus();
    }, [checkStatus]);

    if (loading) {
        return (
            <div className={s.page}>
                <div className={s.card}>
                    <div className={s.loading}>
                        <div className={s.spinner} />
                        <p className={s.loadingText}>Checking payment status...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!result || !result.ok) {
        return (
            <div className={s.page}>
                <div className={s.card}>
                    <div className={`${s.iconWrap} ${s.iconFailed}`}>&#10007;</div>
                    <h1 className={s.title}>Payment Error</h1>
                    <p className={s.subtitle}>We couldn&#39;t verify your payment status.</p>
                    {result?.error && <div className={s.errorBox}>{result.error}</div>}
                    <div className={s.actions}>
                        <a href="/pricing" className={s.btnPrimary}>Try Again</a>
                        <a href="/" className={s.btnSecondary}>Go Home</a>
                    </div>
                </div>
            </div>
        );
    }

    const isSuccess = result.state === "APPROVED";
    const isProcessing = result.state === "PROCESSING" || result.state === "CHECKOUT";
    const isFailed = !isSuccess && !isProcessing;

    if (isProcessing) {
        return (
            <div className={s.page}>
                <div className={s.card}>
                    <div className={`${s.iconWrap} ${s.iconProcessing}`}>&#8987;</div>
                    <h1 className={s.title}>Payment Processing</h1>
                    <p className={s.subtitle}>
                        Your payment is being processed. Tokens will be credited once confirmed.
                    </p>
                    <div className={s.details}>
                        {result.packageName && (
                            <div className={s.detailRow}>
                                <span className={s.detailLabel}>Package</span>
                                <span className={s.detailValue}>{result.packageName}</span>
                            </div>
                        )}
                        {result.orderMerchantId && (
                            <div className={s.detailRow}>
                                <span className={s.detailLabel}>Order</span>
                                <span className={s.detailValue}>{result.orderMerchantId}</span>
                            </div>
                        )}
                        <div className={s.detailRow}>
                            <span className={s.detailLabel}>Status</span>
                            <span className={`${s.badge} ${s.badgeProcessing}`}>{result.state}</span>
                        </div>
                    </div>
                    <div className={s.actions}>
                        <a href="/profile" className={s.btnPrimary}>Go to Profile</a>
                        <a href="/pricing" className={s.btnSecondary}>Back to Pricing</a>
                    </div>
                </div>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className={s.page}>
                <div className={s.card}>
                    <div className={`${s.iconWrap} ${s.iconSuccess}`}>&#10003;</div>
                    <h1 className={s.title}>Payment Successful</h1>
                    <p className={s.subtitle}>Your payment has been confirmed and tokens added to your account.</p>

                    {(result.tokensAdded ?? 0) > 0 && (
                        <div className={s.tokensBox}>
                            <span className={s.tokensAmount}>+{result.tokensAdded}</span>
                            <span className={s.tokensLabel}>tokens credited</span>
                        </div>
                    )}

                    <div className={s.details}>
                        {result.packageName && (
                            <div className={s.detailRow}>
                                <span className={s.detailLabel}>Package</span>
                                <span className={s.detailValue}>{result.packageName}</span>
                            </div>
                        )}
                        {result.amount && result.currency && (
                            <div className={s.detailRow}>
                                <span className={s.detailLabel}>Amount</span>
                                <span className={s.detailValue}>
                                    {result.amount.toFixed(2)} {result.currency}
                                </span>
                            </div>
                        )}
                        {result.orderMerchantId && (
                            <div className={s.detailRow}>
                                <span className={s.detailLabel}>Order</span>
                                <span className={s.detailValue}>{result.orderMerchantId}</span>
                            </div>
                        )}
                        <div className={s.detailRow}>
                            <span className={s.detailLabel}>Status</span>
                            <span className={`${s.badge} ${s.badgeSuccess}`}>Approved</span>
                        </div>
                    </div>

                    <div className={s.actions}>
                        <a href="/profile" className={s.btnPrimary}>Go to Profile</a>
                        <a href="/pricing" className={s.btnSecondary}>Back to Pricing</a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={s.page}>
            <div className={s.card}>
                <div className={`${s.iconWrap} ${s.iconFailed}`}>&#10007;</div>
                <h1 className={s.title}>Payment Failed</h1>
                <p className={s.subtitle}>
                    {result.errorMessage || "Your payment could not be processed. Please try again."}
                </p>

                {result.errorCode && (
                    <div className={s.errorBox}>
                        Error code: {result.errorCode}
                        {result.errorMessage && ` — ${result.errorMessage}`}
                    </div>
                )}

                <div className={s.details}>
                    {result.packageName && (
                        <div className={s.detailRow}>
                            <span className={s.detailLabel}>Package</span>
                            <span className={s.detailValue}>{result.packageName}</span>
                        </div>
                    )}
                    {result.orderMerchantId && (
                        <div className={s.detailRow}>
                            <span className={s.detailLabel}>Order</span>
                            <span className={s.detailValue}>{result.orderMerchantId}</span>
                        </div>
                    )}
                    <div className={s.detailRow}>
                        <span className={s.detailLabel}>Status</span>
                        <span className={`${s.badge} ${s.badgeFailed}`}>{result.state}</span>
                    </div>
                </div>

                <div className={s.actions}>
                    <a href="/pricing" className={s.btnPrimary}>Try Again</a>
                    <a href="/" className={s.btnSecondary}>Go Home</a>
                </div>
            </div>
        </div>
    );
}

export default function ResultPage() {
    return (
        <Suspense fallback={
            <div className={s.page}>
                <div className={s.card}>
                    <div className={s.loading}>
                        <div className={s.spinner} />
                        <p className={s.loadingText}>Loading...</p>
                    </div>
                </div>
            </div>
        }>
            <ResultContent />
        </Suspense>
    );
}
