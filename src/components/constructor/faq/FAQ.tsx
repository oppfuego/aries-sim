"use client";

import { IoIosArrowDown } from "react-icons/io";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./FAQ.module.scss";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items: FAQItem[];
    image?: string;
}

const FAQ: React.FC<FAQProps> = ({ items, image }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const toggle = (idx: number) => setOpenIndex(openIndex === idx ? null : idx);

    const wrapperClass = image
        ? styles.wrapper
        : `${styles.wrapper} ${styles.centered}`;

    return (
        <section className={styles.section}>
            <div className={wrapperClass}>
                <div className={styles.left}>
                    <h2 className={styles.title}>Questions & Answers</h2>

                    <div className={styles.faqList}>
                        {items.map((item, idx) => {
                            const isOpen = openIndex === idx;
                            return (
                                <motion.div
                                    key={idx}
                                    className={`${styles.item} ${isOpen ? styles.active : ""}`}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <button
                                        className={styles.question}
                                        onClick={() => toggle(idx)}
                                        aria-expanded={isOpen}
                                    >
                                        <span>{item.question}</span>
                                        <motion.span
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            transition={{ duration: 0.25 }}
                                            className={styles.arrow}
                                        >
                                            <IoIosArrowDown />
                                        </motion.span>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                key="answer"
                                                className={styles.answerWrapper}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                            >
                                                <div className={styles.answerContent}>
                                                    {item.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {image && (
                    <div className={styles.right}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={image}
                                alt="FAQ Illustration"
                                width={500}
                                height={600}
                                className={styles.image}
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FAQ;
