"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./ValuesIcons.module.scss";
import Text from "@/components/constructor/text/Text";
import { renderIcon } from "@/utils/renderIcon";
import { IconKey } from "@/resources/icons";

interface ValueItem {
    icon: IconKey | string;
    title: string;
    text?: string;
    description?: string;
}

interface ValuesIconsProps {
    title?: string;
    description?: string;
    values: ValueItem[];
}

const ValuesIcons: React.FC<ValuesIconsProps> = ({
                                                     title,
                                                     description,
                                                     values,
                                                 }) => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <Text
                    title={title}
                    description={description}
                    centerTitle
                    centerDescription
                />

                <div className={styles.grid}>
                    {values.map((v, i) => (
                        <motion.div
                            key={i}
                            className={styles.card}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.12, duration: 0.45 }}
                            viewport={{ once: true }}
                        >
                            <div className={styles.iconWrapper}>
                                {renderIcon(v.icon)}
                            </div>

                            <h3 className={styles.cardTitle}>{v.title}</h3>
                            <p className={styles.cardText}>
                                {v.description ?? v.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ValuesIcons;