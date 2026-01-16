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
    description: string;
    primaryCta?: { text: string; link: string };
    secondaryCta?: { text: string; link: string };
    image: string;
    showTrustBadge?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
                                                     title,
                                                     description,
                                                     primaryCta,
                                                     secondaryCta,
                                                     image,
                                                     showTrustBadge = false,
                                                 }) => {
    const img =
        (media as Record<string, string | StaticImageData>)[image];

    return (
        <section className={styles.hero}>
            <div className={styles.inner}>
                {/* LEFT — IMAGE */}
                <motion.div
                    className={styles.imageWrapper}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Image
                        src={typeof img === "string" ? img : img.src}
                        alt="Hero illustration"
                        width={860}
                        height={620}
                        priority
                    />
                </motion.div>

                {/* RIGHT — CONTENT */}
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className={styles.title}>{title}</h1>

                    <p className={styles.description}>{description}</p>

                    <div className={styles.actions}>
                        {primaryCta && (
                            <Link href={primaryCta.link}>
                                <ButtonUI fullWidth shape="rounded" size="lg" color="secondary" hoverColor="backgroundDark">{primaryCta.text}</ButtonUI>
                            </Link>
                        )}
                        {secondaryCta && (
                            <Link href={secondaryCta.link}>
                                <ButtonUI variant="outlined" size="lg">
                                    {secondaryCta.text}
                                </ButtonUI>
                            </Link>
                        )}
                    </div>

                    {showTrustBadge && (
                        <div className={styles.trust}>
                            <TrustBadge />
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
