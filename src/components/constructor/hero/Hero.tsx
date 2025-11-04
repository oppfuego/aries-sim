"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Hero.module.scss";
import Image from "next/image";
import Link from "next/link";
import ButtonUI from "@/components/ui/button/ButtonUI";
import TrustBadge from "@/components/features/trust-badge/TrustBadge";
import { media } from "@/resources/media";
import type { StaticImageData } from "next/image";

interface HeroSectionProps {
    title: string;
    highlight?: string;
    description: string;
    primaryCta?: { text: string; link: string };
    secondaryCta?: { text: string; link: string };
    image?: string;
    align?: "left" | "right";
    showTrustBadge?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
                                                     title,
                                                     highlight,
                                                     description,
                                                     primaryCta,
                                                     secondaryCta,
                                                     image,
                                                     align = "center",
                                                     showTrustBadge = false,
                                                 }) => {
    const bgImage = image
        ? (media as Record<string, string | StaticImageData>)[image]
        : undefined;

    const imageSrc =
        typeof bgImage === "string"
            ? bgImage
            : (bgImage as StaticImageData)?.src || "";

    return (
        <section className={`${styles.hero} ${styles[`align_${align}`]}`}>
            {imageSrc && (
                <Image
                    src={imageSrc}
                    alt="Hero Background"
                    fill
                    priority
                    className={styles.bgImage}
                />
            )}
            <div className={styles.overlay} />

            <motion.div
                className={styles.content}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className={styles.textBlock}>
                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {title}{" "}
                        {highlight && <span className={styles.highlight}>{highlight}</span>}
                    </motion.h1>

                    <motion.p
                        className={styles.description}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {description}
                    </motion.p>

                    <motion.div
                        className={styles.actions}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        {primaryCta && (
                            <Link href={primaryCta.link}>
                                <ButtonUI variant="solid" color="primary" size="lg">
                                    {primaryCta.text}
                                </ButtonUI>
                            </Link>
                        )}
                        {secondaryCta && (
                            <Link href={secondaryCta.link}>
                                <ButtonUI variant="outlined" color="secondary" size="lg">
                                    {secondaryCta.text}
                                </ButtonUI>
                            </Link>
                        )}
                        {showTrustBadge && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className={styles.trustBadge}
                            >
                                <TrustBadge />
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
