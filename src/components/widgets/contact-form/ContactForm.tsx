"use client";

import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { motion } from "framer-motion";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { validationSchema, initialValues, sendContactRequest } from "./schema";
import { useAlert } from "@/context/AlertContext";

import {
    FaGlobe,
    FaQrcode,
    FaWallet,
    FaSignal,
    FaEnvelope,
    FaPhoneAlt,
    FaClock,
} from "react-icons/fa";

import {
    COMPANY_EMAIL,
    COMPANY_PHONE,
} from "@/resources/constants";

import styles from "./ContactForm.module.scss";

interface ContactFormValues {
    name: string;
    secondName: string;
    email: string;
    phone: string;
    message?: string;
}

const ContactSupport: React.FC = () => {
    const { showAlert } = useAlert();
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (
        values: ContactFormValues,
        { setSubmitting, resetForm }: FormikHelpers<ContactFormValues>
    ) => {
        try {
            await sendContactRequest(values);
            resetForm();
            setSuccessMsg("Your message has been sent. Our support team will contact you shortly.");
            showAlert("Success", "Message sent successfully", "success");
        } catch {
            showAlert("Error", "Something went wrong. Try again.", "error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className={styles.section}>
            {/* ===== TOP ===== */}
            <motion.header
                className={styles.top}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2>Need Help Staying Connected?</h2>
                <p>
                    Our support team helps travelers with eSIM setup, payments,
                    and connectivity worldwide.
                </p>
            </motion.header>

            {/* ===== MAIN LAYOUT ===== */}
            <div className={styles.layout}>
                {/* LEFT — HELP OPTIONS */}
                <motion.div
                    className={styles.help}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h3>We Can Help With</h3>

                    <ul className={styles.helpList}>
                        <li>
                            <FaGlobe />
                            <div>
                                <strong>Choosing an eSIM</strong>
                                <span>Country, regional or global plans</span>
                            </div>
                        </li>

                        <li>
                            <FaQrcode />
                            <div>
                                <strong>Installation & activation</strong>
                                <span>QR code setup & device compatibility</span>
                            </div>
                        </li>

                        <li>
                            <FaWallet />
                            <div>
                                <strong>Payments & billing</strong>
                                <span>Invoices, refunds & currencies</span>
                            </div>
                        </li>

                        <li>
                            <FaSignal />
                            <div>
                                <strong>Connection issues</strong>
                                <span>Speed, coverage & troubleshooting</span>
                            </div>
                        </li>
                    </ul>
                </motion.div>

                {/* RIGHT — FORM */}
                <motion.div
                    className={styles.formCard}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    {successMsg ? (
                        <div className={styles.success}>{successMsg}</div>
                    ) : (
                        <Formik<ContactFormValues>
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className={styles.form}>
                                    <div className={styles.row}>
                                        <Field name="name" placeholder="First name" />
                                        <Field name="secondName" placeholder="Last name" />
                                    </div>

                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="Email address"
                                    />
                                    <Field
                                        name="phone"
                                        type="tel"
                                        placeholder="Phone number"
                                    />
                                    <Field
                                        as="textarea"
                                        name="message"
                                        placeholder="Describe your issue or question"
                                        rows={5}
                                    />

                                    <ButtonUI
                                        type="submit"
                                        fullWidth
                                        loading={isSubmitting}
                                        text="Contact Support"
                                        color="secondary"
                                    />
                                </Form>
                            )}
                        </Formik>
                    )}
                </motion.div>
            </div>

            {/* ===== SUPPORT FOOTER ===== */}
            <footer className={styles.support}>
                <div>
                    <FaEnvelope />
                    <span>{COMPANY_EMAIL}</span>
                </div>
                <div>
                    <FaPhoneAlt />
                    <span>{COMPANY_PHONE}</span>
                </div>
                <div>
                    <FaClock />
                    <span>Support available 24/7</span>
                </div>
            </footer>
        </section>
    );
};

export default ContactSupport;
