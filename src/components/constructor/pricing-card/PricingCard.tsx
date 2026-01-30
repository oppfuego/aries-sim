"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import styles from "./PricingCard.module.scss";
import ButtonUI from "@/components/ui/button/ButtonUI";
import Input from "@mui/joy/Input";
import { useAlert } from "@/context/AlertContext";
import { useUser } from "@/context/UserContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/utils/store";

const TOKENS_PER_GBP = 100;

interface PricingCardProps {
    variant?: "starter" | "pro" | "premium" | "custom";
    title: string;
    price: string;
    tokens: number;
    description: string;
    features: string[];
    buttonText: string;
    badgeTop?: string;
    index?: number;
}

const PricingCard: React.FC<PricingCardProps> = ({
                                                     variant = "starter",
                                                     title,
                                                     price,
                                                     tokens,
                                                     description,
                                                     features,
                                                     buttonText,
                                                     badgeTop,
                                                     index = 0,
                                                 }) => {
    const { showAlert } = useAlert();
    const user = useUser();
    const { currency, sign, convertFromGBP, convertToGBP } = useCurrency();
    const router = useRouter();
    const { setPlan } = useCheckoutStore();

    const isCustom = price === "dynamic";
    const [customAmount, setCustomAmount] = useState(10);

    const basePriceGBP = useMemo(() => {
        if (isCustom) return 0;
        const num = parseFloat(price.replace(/[^0-9.]/g, ""));
        return isNaN(num) ? 0 : num;
    }, [price, isCustom]);

    const convertedPrice = useMemo(() => {
        if (isCustom) return 0;
        return convertFromGBP(basePriceGBP);
    }, [basePriceGBP, convertFromGBP, isCustom]);

    const calculatedTokens = useMemo(() => {
        const gbp = convertToGBP(customAmount);
        return Math.floor(gbp * TOKENS_PER_GBP);
    }, [customAmount, convertToGBP]);

    const handleBuy = () => {
        if (!user) {
            showAlert("Sign up required", "Please sign in to continue", "info");
            setTimeout(() => router.push("/sign-up"), 1200);
            return;
        }

        const finalPriceGBP = isCustom
            ? convertToGBP(customAmount)
            : basePriceGBP;

        const finalTokens = isCustom
            ? Math.floor(finalPriceGBP * TOKENS_PER_GBP)
            : tokens;

        const plan = {
            title,
            price: finalPriceGBP, // ❗️ЗАВЖДИ GBP
            tokens: finalTokens,
            currency,
            variant,
        };

        setPlan(plan);
        localStorage.setItem("selectedPlan", JSON.stringify(plan));
        router.push("/checkout");
    };

    return (
        <motion.div
            className={`${styles.card} ${styles[variant]}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
        >
            {badgeTop && <span className={styles.badgeTop}>{badgeTop}</span>}

            <h3 className={styles.title}>{title}</h3>

            {!isCustom ? (
                <div className={styles.priceRow}>
                    <span className={styles.price}>
                        {sign}
                        {convertedPrice.toFixed(2)}
                    </span>
                    <span className={styles.tokens}>{tokens} tokens</span>
                </div>
            ) : (
                <div className={styles.customBlock}>
                    <Input
                        type="number"
                        value={customAmount}
                        onChange={(e) =>
                            setCustomAmount(Math.max(1, Number(e.target.value)))
                        }
                        startDecorator={sign}
                        size="sm"
                    />
                    <span className={styles.customHint}>
                        ≈ {calculatedTokens} tokens
                    </span>
                </div>
            )}

            <p className={styles.description}>{description}</p>

            <ul className={styles.features}>
                {features.map((f, i) => (
                    <li key={i}>{f}</li>
                ))}
            </ul>

            <ButtonUI fullWidth size="sm" variant="soft" onClick={handleBuy}>
                {user ? buttonText : "Sign up to continue"}
            </ButtonUI>
        </motion.div>
    );
};

export default PricingCard;