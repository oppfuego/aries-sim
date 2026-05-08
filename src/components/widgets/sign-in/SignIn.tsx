"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useAlert } from "@/context/AlertContext";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import styles from "../auth/Auth.module.scss";

export type SignInValues = { email: string; password: string };

const initialValues: SignInValues = { email: "", password: "" };

function validate(values: SignInValues) {
    const errors: Partial<SignInValues> = {};
    if (!values.email) errors.email = "Email is required";
    if (!values.password) errors.password = "Password is required";
    return errors;
}

export default function SignIn() {
    const { showAlert } = useAlert();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (
        values: SignInValues,
        { setSubmitting }: FormikHelpers<SignInValues>,
    ) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(values),
            });
            const data = await res.json();
            if (res.ok && data?.user) {
                showAlert("Welcome back!", "", "success");
                router.replace("/");
                router.refresh();
            } else {
                showAlert(data?.message || "Login failed", "", "error");
            }
        } catch {
            showAlert("Network error", "", "error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Welcome back</h1>
                    <p className={styles.subtitle}>Sign in to your account to continue</p>
                </div>

                <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <Form className={styles.form} autoComplete="on">
                            <div className={styles.fieldGroup}>
                                <label className={styles.label} htmlFor="signin-email">Email</label>
                                <div className={styles.inputWrapper}>
                                    <Mail className={styles.inputIcon} size={18} />
                                    <Field
                                        id="signin-email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        className={styles.input}
                                    />
                                </div>
                                <ErrorMessage name="email" component="span" className={styles.error} />
                            </div>

                            <div className={styles.fieldGroup}>
                                <label className={styles.label} htmlFor="signin-password">Password</label>
                                <div className={styles.inputWrapper}>
                                    <Lock className={styles.inputIcon} size={18} />
                                    <Field
                                        id="signin-password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        className={styles.input}
                                    />
                                    <button
                                        type="button"
                                        className={styles.togglePassword}
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <ErrorMessage name="password" component="span" className={styles.error} />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={styles.submitBtn}
                            >
                                {isSubmitting ? <span className={styles.spinner} /> : "Sign In"}
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className={styles.footerText}>
                    Don&apos;t have an account?{" "}
                    <a href="/sign-up" className={styles.footerLink}>Create one</a>
                </p>
            </div>
        </div>
    );
}
