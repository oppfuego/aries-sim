"use client";

import styles from "./EsimCheckout.module.scss";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { FaCheckCircle } from "react-icons/fa";

type Props = {
    country: string;
    code: string;
    plan: string;
    priceEur: number;
};

export default function EsimCheckout({
                                         country,
                                         code,
                                         plan,
                                         priceEur,
                                     }: Props) {
    const router = useRouter();
    const user = useUser();

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // pricing
    const EUR_TO_GBP = 0.86;
    const TOKENS_PER_GBP = 100;
    const MARKUP_EUR = 1;

    const tokens = Math.ceil(
        (priceEur + MARKUP_EUR) * EUR_TO_GBP * TOKENS_PER_GBP
    );

    // 👉 автозаповнення для логіненого юзера
    useEffect(() => {
        if (user?.email) setEmail(user.email);
    }, [user]);

    const handlePay = async () => {
        setError(null);

        if (!email) {
            setError("Please enter your email");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/e-sim/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    country,
                    code,
                    plan,
                    tokens,
                    email,
                    phone,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Payment failed");
            }

            setSuccess(true);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    /* ===================== SUCCESS STATE ===================== */
    if (success) {
        return (
            <section className={styles.page}>
                <div className={styles.success}>
                    <FaCheckCircle size={80} />
                    <h2>Payment accepted</h2>
                    <p>
                        We’ve sent the eSIM activation details to your email.
                        <br />
                        Please check your inbox.
                    </p>

                    <ButtonUI
                        size="lg"
                        shape="rounded"
                        onClick={() => router.push("/profile")}
                    >
                        Go to Profile
                    </ButtonUI>
                </div>
            </section>
        );
    }

    /* ===================== NORMAL CHECKOUT ===================== */
    return (
        <section className={styles.page}>
            <div className={styles.layout}>
                {/* LEFT — PRODUCT INFO */}
                <div className={styles.info}>
                    <div className={styles.countryHeader}>
                        <img
                            src={`https://flagcdn.com/w80/${code.toLowerCase()}.png`}
                            alt={country}
                        />
                        <div>
                            <h1 className={styles.title}>{country} eSIM</h1>
                            <p className={styles.subtitle}>{plan}</p>
                        </div>
                    </div>

                    <p className={styles.description}>
                        Stay connected in {country} with high-speed 4G/5G mobile internet.
                        Instant delivery, no physical SIM card required.
                    </p>

                    <div className={styles.features}>
                        <h3 className={styles.sectionTitle}>Why choose this eSIM</h3>
                        <ul className={styles.list}>
                            <li>Instant activation after payment</li>
                            <li>No roaming fees</li>
                            <li>Works with eSIM-compatible devices</li>
                            <li>Secure & private connection</li>
                        </ul>
                    </div>

                    <div className={styles.details}>
                        <h3 className={styles.sectionTitle}>What’s included</h3>
                        <ul className={styles.list}>
                            <li>{plan}</li>
                            <li>Nationwide coverage</li>
                            <li>QR-code delivery via email</li>
                            <li>24/7 customer support</li>
                        </ul>
                    </div>
                </div>

                {/* RIGHT — CHECKOUT CARD */}
                <aside className={styles.checkout}>
                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Checkout</h2>

                        {/* CONTACT INFO */}
                        <div className={styles.formGroup}>
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="you@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Phone (optional)</label>
                            <input
                                type="tel"
                                placeholder="+1 555 123 4567"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className={styles.summaryRow}>
                            <span>Country</span>
                            <strong>{country}</strong>
                        </div>

                        <div className={styles.summaryRow}>
                            <span>Plan</span>
                            <strong>{plan}</strong>
                        </div>

                        <div className={styles.divider} />

                        <div className={styles.total}>
                            <span>Total</span>
                            <strong>{tokens} tokens</strong>
                        </div>

                        {error && <p className={styles.error}>{error}</p>}

                        <ButtonUI
                            size="lg"
                            shape="rounded"
                            fullWidth
                            disabled={loading}
                            onClick={handlePay}
                        >
                            {loading ? "Processing..." : `Pay ${tokens} tokens`}
                        </ButtonUI>

                        <button
                            className={styles.back}
                            onClick={() => router.back()}
                        >
                            ← Back to store
                        </button>
                    </div>
                </aside>
            </div>
        </section>
    );
}
