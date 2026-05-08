"use client";

import React, { useEffect, useState, useMemo } from "react";
import styles from "./Checkout.module.scss";
import { useCurrency } from "@/context/CurrencyContext";
import { useCheckoutStore } from "@/utils/store";
import { useAlert } from "@/context/AlertContext";

function collectBrowserData() {
    return {
        colorDepth: window.screen.colorDepth,
        screenHeight: window.screen.height,
        screenWidth: window.screen.width,
        timeZone: new Date().getTimezoneOffset(),
        javaEnabled: false,
        javascriptEnabled: true,
        acceptLanguage: navigator.language,
        userAgent: navigator.userAgent,
    };
}

const Checkout = () => {
    const { plan, setPlan } = useCheckoutStore();
    const [activePlan, setActivePlan] = useState(plan);
    const { currency, sign, convertFromGBP } = useCurrency();
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlert();

    const isLocalhost = typeof window !== "undefined" &&
        (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

    const [cardNumber, setCardNumber] = useState(isLocalhost ? "4165 9852 2362 9556" : "");
    const [expiry, setExpiry] = useState(isLocalhost ? "03/31" : "");
    const [cvv, setCvv] = useState(isLocalhost ? "572" : "");
    const [cardName, setCardName] = useState(isLocalhost ? "David Petrov Dukat" : "");

    useEffect(() => {
        if (!plan) {
            const stored = localStorage.getItem("selectedPlan");
            if (stored) {
                const parsed = JSON.parse(stored);
                setPlan(parsed);
                setActivePlan(parsed);
            }
        } else {
            setActivePlan(plan);
        }
    }, [plan, setPlan]);

    if (!activePlan)
        return (
            <div className={styles.checkoutEmpty}>
                <p>
                    No plan selected. Please go back to{" "}
                    <a href="/pricing">Pricing</a>.
                </p>
            </div>
        );

    const convertedPrice = useMemo(() => {
        return convertFromGBP(activePlan.price);
    }, [activePlan.price, convertFromGBP, currency]);

    const vat = useMemo(() => convertedPrice * 0.2, [convertedPrice]);
    const total = useMemo(() => convertedPrice + vat, [convertedPrice, vat]);

    const handlePay = async () => {
        if (!agreed || !activePlan || loading) return;

        const cleanCard = cardNumber.replace(/\s/g, "");
        if (cleanCard.length !== 16) {
            showAlert("Validation", "Please enter a valid 16-digit card number", "warning");
            return;
        }
        if (!expiry.includes("/") || expiry.length < 5) {
            showAlert("Validation", "Please enter expiry as MM/YY", "warning");
            return;
        }
        if (cvv.length < 3) {
            showAlert("Validation", "Please enter a valid CVV", "warning");
            return;
        }
        if (cardName.trim().length < 2) {
            showAlert("Validation", "Please enter cardholder name", "warning");
            return;
        }

        const [expMonth, expYearShort] = expiry.split("/");
        const expYear = expYearShort.length === 2 ? `20${expYearShort}` : expYearShort;

        setLoading(true);
        try {
            const browser = collectBrowserData();

            const res = await fetch("/api/madfin/sale", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: activePlan.title,
                    price: activePlan.price,
                    tokens: activePlan.tokens,
                    currency,
                    variant: activePlan.variant,
                    card: {
                        cardNumber: cleanCard,
                        cvv2: cvv,
                        expireMonth: expMonth.padStart(2, "0"),
                        expireYear: expYear,
                        cardPrintedName: cardName.trim().toUpperCase(),
                    },
                    browser,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Payment initiation failed");
            }

            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
                return;
            }

            if (data.state === "APPROVED") {
                localStorage.removeItem("selectedPlan");
                showAlert("Success", "Payment completed successfully.", "success");
                setTimeout(() => {
                    window.location.href = "/payment-success?order=" + data.orderMerchantId;
                }, 1200);
                return;
            }

            if (data.state === "PROCESSING" && data.orderMerchantId) {
                const pollDelays = [3000, 5000, 5000, 10000];
                for (const delay of pollDelays) {
                    await new Promise((r) => setTimeout(r, delay));
                    const statusRes = await fetch("/api/madfin/status", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ orderMerchantId: data.orderMerchantId }),
                    });
                    const statusData = await statusRes.json();

                    if (statusData.redirectUrl) {
                        window.location.href = statusData.redirectUrl;
                        return;
                    }
                    if (statusData.state === "APPROVED") {
                        localStorage.removeItem("selectedPlan");
                        showAlert("Success", "Payment completed successfully.", "success");
                        setTimeout(() => {
                            window.location.href = "/payment-success?order=" + data.orderMerchantId;
                        }, 1200);
                        return;
                    }
                    if (["DECLINED", "ERROR", "FILTERED"].includes(statusData.state)) {
                        throw new Error(statusData.errorMessage || statusData.state);
                    }
                }
                showAlert("Processing", "Your payment is being processed. You'll receive a confirmation shortly.", "info");
                setTimeout(() => {
                    window.location.href = "/payment-success?order=" + data.orderMerchantId;
                }, 2000);
                return;
            }

            if (data.errorMessage) {
                throw new Error(data.errorMessage);
            }

            throw new Error("Payment could not be processed. Please try again.");
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : "Payment failed";
            showAlert("Payment Error", message, "error");
        } finally {
            setLoading(false);
        }
    };

    const formatCardNumber = (value: string) => {
        const digits = value.replace(/\D/g, "").slice(0, 16);
        return digits.replace(/(.{4})/g, "$1 ").trim();
    };

    const formatExpiry = (value: string) => {
        const digits = value.replace(/\D/g, "").slice(0, 4);
        if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
        return digits;
    };

    return (
        <div className={styles.checkout}>
            <div className={styles.container}>
                {/* ─── LEFT: Summary ─── */}
                <div className={styles.summaryPanel}>
                    <div className={styles.summaryTop}>
                        <a href="/pricing" className={styles.backLink}>
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to pricing
                        </a>

                        <span className={styles.planBadge}>{activePlan.variant} plan</span>
                        <h2 className={styles.planName}>{activePlan.title}</h2>
                        <p className={styles.planDesc}>{activePlan.tokens} tokens included</p>

                        <div className={styles.priceBlock}>
                            <span className={styles.priceMain}>{sign}{total.toFixed(2)}</span>
                            <span className={styles.priceCurrency}>{currency}</span>
                        </div>

                        <div className={styles.divider} />

                        <div className={styles.lineItem}>
                            <span>Subtotal</span>
                            <strong>{sign}{convertedPrice.toFixed(2)}</strong>
                        </div>
                        <div className={styles.lineItem}>
                            <span>VAT (20%)</span>
                            <strong>{sign}{vat.toFixed(2)}</strong>
                        </div>
                        <div className={styles.totalItem}>
                            <span>Total</span>
                            <span>{sign}{total.toFixed(2)} {currency}</span>
                        </div>
                    </div>

                    <div className={styles.secureNote}>
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                        Payments are secure and encrypted
                    </div>
                </div>

                {/* ─── RIGHT: Payment Form ─── */}
                <div className={styles.formPanel}>
                    <h2 className={styles.formTitle}>Payment details</h2>
                    <p className={styles.formSubtitle}>Complete your purchase securely</p>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.fieldGroup}>
                            <div className={styles.field}>
                                <label className={styles.fieldLabel}>Cardholder name</label>
                                <input
                                    className={styles.fieldInput}
                                    type="text"
                                    placeholder="Full name on card"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                    autoComplete="cc-name"
                                />
                            </div>

                            <div className={styles.field}>
                                <label className={styles.fieldLabel}>Card information</label>
                                <div className={styles.cardInputGroup}>
                                    <div className={styles.cardNumberRow}>
                                        <input
                                            type="text"
                                            placeholder="1234 1234 1234 1234"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                            inputMode="numeric"
                                            autoComplete="cc-number"
                                        />
                                    </div>
                                    <div className={styles.cardBottomRow}>
                                        <div className={styles.expiryField}>
                                            <input
                                                type="text"
                                                placeholder="MM / YY"
                                                value={expiry}
                                                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                                inputMode="numeric"
                                                autoComplete="cc-exp"
                                            />
                                        </div>
                                        <div className={styles.cvvField}>
                                            <input
                                                type="text"
                                                placeholder="CVC"
                                                value={cvv}
                                                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                                inputMode="numeric"
                                                autoComplete="cc-csc"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <label className={styles.agreement}>
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                            />
                            <span>
                                I agree to the{" "}
                                <a href="/terms" target="_blank" rel="noopener noreferrer">
                                    terms & conditions
                                </a>{" "}
                                and{" "}
                                <a href="/privacy" target="_blank" rel="noopener noreferrer">
                                    privacy policy
                                </a>
                            </span>
                        </label>

                        <button
                            type="button"
                            disabled={!agreed || loading}
                            onClick={handlePay}
                            className={`${styles.payButton} ${!agreed || loading ? styles.disabled : ""}`}
                        >
                            {loading ? (
                                <>
                                    <span className={styles.spinner} />
                                    Processing...
                                </>
                            ) : (
                                `Pay ${sign}${total.toFixed(2)} ${currency}`
                            )}
                        </button>
                    </form>

                    <div className={styles.poweredBy}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        Powered by Madfin
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
