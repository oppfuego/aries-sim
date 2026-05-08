"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers, useField } from "formik";
import { useAlert } from "@/context/AlertContext";
import { useRouter } from "next/navigation";
import {
    Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Building2, Hash, Calendar,
} from "lucide-react";
import { allowedRegistrationCountries, allowedRegistrationCountryNames } from "@/resources/countries";
import styles from "../auth/Auth.module.scss";

const initialValues = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    country: "",
    postCode: "",
    password: "",
    confirmPassword: "",
    terms: false,
};

type Values = typeof initialValues;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Values) {
    const errors: Partial<Record<keyof Values, string>> = {};
    const t = (v: string) => v.trim();

    if (!t(values.firstName)) errors.firstName = "Required";
    if (!t(values.lastName)) errors.lastName = "Required";
    if (!t(values.dateOfBirth)) errors.dateOfBirth = "Required";
    if (!t(values.email)) errors.email = "Required";
    else if (!EMAIL_REGEX.test(t(values.email))) errors.email = "Invalid email";
    if (!t(values.phoneNumber)) errors.phoneNumber = "Required";
    if (!t(values.street)) errors.street = "Required";
    if (!t(values.city)) errors.city = "Required";
    if (!t(values.country)) errors.country = "Required";
    else if (!allowedRegistrationCountryNames.has(t(values.country))) errors.country = "Select a supported country";
    if (!t(values.postCode)) errors.postCode = "Required";
    if (!values.password) errors.password = "Required";
    if (!values.confirmPassword) errors.confirmPassword = "Required";
    else if (values.confirmPassword !== values.password) errors.confirmPassword = "Passwords don't match";
    if (!values.terms) errors.terms = "You must agree";

    return errors;
}

function CountrySelectField({ name }: { name: string }) {
    const [field, meta, helpers] = useField<string>(name);
    return (
        <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="signup-country">Country</label>
            <div className={styles.inputWrapper}>
                <MapPin className={styles.inputIcon} size={18} />
                <select
                    id="signup-country"
                    name={name}
                    value={field.value}
                    onChange={(e) => helpers.setValue(e.target.value)}
                    onBlur={() => helpers.setTouched(true)}
                    className={styles.select}
                    autoComplete="country-name"
                >
                    <option value="">Select country</option>
                    {allowedRegistrationCountries.map((c) => (
                        <option key={c.code} value={c.name}>{c.name}</option>
                    ))}
                </select>
            </div>
            {meta.touched && meta.error && <span className={styles.error}>{meta.error}</span>}
        </div>
    );
}

export default function SignUp() {
    const { showAlert } = useAlert();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>,
    ) => {
        try {
            const payload = {
                firstName: values.firstName.trim(),
                lastName: values.lastName.trim(),
                dateOfBirth: values.dateOfBirth,
                email: values.email.trim(),
                phoneNumber: values.phoneNumber.trim(),
                street: values.street.trim(),
                city: values.city.trim(),
                country: values.country.trim(),
                postCode: values.postCode.trim(),
                password: values.password,
            };
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (res.ok && data?.user) {
                showAlert("Account created!", "", "success");
                router.replace("/");
                router.refresh();
            } else {
                showAlert(data?.message || "Registration failed", "", "error");
            }
        } catch {
            showAlert("Network error", "", "error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={`${styles.card} ${styles.wide}`}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Create account</h1>
                    <p className={styles.subtitle}>Fill in your details to get started</p>
                </div>

                <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
                    {({ isSubmitting, values }) => (
                        <Form className={styles.form} autoComplete="on">
                            <div className={styles.grid}>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="signup-fname">First name</label>
                                    <div className={styles.inputWrapper}>
                                        <User className={styles.inputIcon} size={18} />
                                        <Field id="signup-fname" name="firstName" type="text" placeholder="John" autoComplete="given-name" className={styles.input} />
                                    </div>
                                    <ErrorMessage name="firstName" component="span" className={styles.error} />
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="signup-lname">Last name</label>
                                    <div className={styles.inputWrapper}>
                                        <User className={styles.inputIcon} size={18} />
                                        <Field id="signup-lname" name="lastName" type="text" placeholder="Doe" autoComplete="family-name" className={styles.input} />
                                    </div>
                                    <ErrorMessage name="lastName" component="span" className={styles.error} />
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="signup-dob">Date of birth</label>
                                    <div className={styles.inputWrapper}>
                                        <Calendar className={styles.inputIcon} size={18} />
                                        <Field id="signup-dob" name="dateOfBirth" type="date" autoComplete="bday" className={styles.input} />
                                    </div>
                                    <ErrorMessage name="dateOfBirth" component="span" className={styles.error} />
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="signup-email">Email</label>
                                    <div className={styles.inputWrapper}>
                                        <Mail className={styles.inputIcon} size={18} />
                                        <Field id="signup-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" className={styles.input} />
                                    </div>
                                    <ErrorMessage name="email" component="span" className={styles.error} />
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="signup-phone">Phone</label>
                                    <div className={styles.inputWrapper}>
                                        <Phone className={styles.inputIcon} size={18} />
                                        <Field id="signup-phone" name="phoneNumber" type="tel" placeholder="+44 7000 000000" autoComplete="tel" className={styles.input} />
                                    </div>
                                    <ErrorMessage name="phoneNumber" component="span" className={styles.error} />
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="signup-street">Street</label>
                                    <div className={styles.inputWrapper}>
                                        <MapPin className={styles.inputIcon} size={18} />
                                        <Field id="signup-street" name="street" type="text" placeholder="123 Main St" autoComplete="street-address" className={styles.input} />
                                    </div>
                                    <ErrorMessage name="street" component="span" className={styles.error} />
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="signup-city">City</label>
                                    <div className={styles.inputWrapper}>
                                        <Building2 className={styles.inputIcon} size={18} />
                                        <Field id="signup-city" name="city" type="text" placeholder="London" autoComplete="address-level2" className={styles.input} />
                                    </div>
                                    <ErrorMessage name="city" component="span" className={styles.error} />
                                </div>

                                <CountrySelectField name="country" />

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="signup-postcode">Post code</label>
                                    <div className={styles.inputWrapper}>
                                        <Hash className={styles.inputIcon} size={18} />
                                        <Field id="signup-postcode" name="postCode" type="text" placeholder="SW1A 1AA" autoComplete="postal-code" className={styles.input} />
                                    </div>
                                    <ErrorMessage name="postCode" component="span" className={styles.error} />
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="signup-password">Password</label>
                                    <div className={styles.inputWrapper}>
                                        <Lock className={styles.inputIcon} size={18} />
                                        <Field id="signup-password" name="password" type={showPassword ? "text" : "password"} placeholder="Create a password" autoComplete="new-password" className={styles.input} />
                                        <button type="button" className={styles.togglePassword} onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    <ErrorMessage name="password" component="span" className={styles.error} />
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="signup-confirm">Confirm password</label>
                                    <div className={styles.inputWrapper}>
                                        <Lock className={styles.inputIcon} size={18} />
                                        <Field id="signup-confirm" name="confirmPassword" type={showConfirm ? "text" : "password"} placeholder="Repeat password" autoComplete="new-password" className={styles.input} />
                                        <button type="button" className={styles.togglePassword} onClick={() => setShowConfirm(!showConfirm)} tabIndex={-1}>
                                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    <ErrorMessage name="confirmPassword" component="span" className={styles.error} />
                                </div>
                            </div>

                            <label className={styles.terms}>
                                <Field type="checkbox" name="terms" />
                                <span>
                                    I agree to the{" "}
                                    <a href="/terms-and-conditions">Terms & Conditions</a>
                                    {" "}and{" "}
                                    <a href="/privacy">Privacy Policy</a>
                                </span>
                            </label>
                            <ErrorMessage name="terms" component="span" className={styles.error} />

                            <button
                                type="submit"
                                disabled={isSubmitting || !values.terms}
                                className={styles.submitBtn}
                            >
                                {isSubmitting ? <span className={styles.spinner} /> : "Create Account"}
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className={styles.footerText}>
                    Already have an account?{" "}
                    <a href="/sign-in" className={styles.footerLink}>Sign in</a>
                </p>
            </div>
        </div>
    );
}
