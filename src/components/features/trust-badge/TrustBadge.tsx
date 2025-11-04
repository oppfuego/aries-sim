"use client";

import React from "react";
import styles from "./TrustBadge.module.scss";
import { Star } from "lucide-react";

const TrustBadge = () => {
    return (
        <div className={styles.badge}>
            <div className={styles.topRow}>
                <span className={styles.label}>Excellent</span>
                <div className={styles.stars}>
                    {[1, 2, 3, 4].map((i) => (
                        <Star key={i} size={18} className={`${styles.star} ${styles.filled}`} />
                    ))}
                    <Star size={18} className={`${styles.star} ${styles.empty}`} />
                </div>
            </div>

            <div className={styles.brand}>
                <Star size={16} className={styles.brandIcon} />
                <span className={styles.brandText}>Trustmark</span>
            </div>
        </div>
    );
};

export default TrustBadge;
