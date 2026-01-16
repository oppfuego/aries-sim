"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./Timeline.module.scss";
import Text from "@/components/constructor/text/Text";

interface Step {
    title: string;
    description: string;
}

interface TimelineProps {
    title?: string;
    description?: string;
    steps: Step[];
    align?: "left" | "center";
}

const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
};

const Timeline: React.FC<TimelineProps> = ({
                                               title,
                                               description,
                                               steps,
                                               align = "left",
                                           }) => {
    return (
        <section className={styles.timelineSection}>
            <div className={styles.container}>
                <div className={styles.head}>
                    {title && <h2 className={styles.sectionTitle}>{title}</h2>}
                    {description && (
                        <p className={styles.sectionDesc}>{description}</p>
                    )}
                </div>

                <div className={styles.timeline}>
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className={styles.timelineItem}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.45, delay: index * 0.1 }}
                        >
                            <div className={styles.marker}>
                                <span>{index + 1}</span>
                            </div>

                            <div className={styles.card}>
                                <h4>{step.title}</h4>
                                <p>{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Timeline;
