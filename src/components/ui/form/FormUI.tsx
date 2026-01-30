"use client";

import React from "react";
import { Form, Field, ErrorMessage, useFormikContext } from "formik";
import styles from "./FormUI.module.scss";
import InputUI from "@/components/ui/input/InputUI";
import ButtonUI from "@/components/ui/button/ButtonUI";
import clsx from "clsx";
import CountrySelect from "@/components/ui/country-select/CountrySelect";

interface FieldConfig {
    name: string;
    type: string;
    placeholder?: string;
}

interface FormUIProps {
    title: string;
    description?: string;
    isSubmitting?: boolean;
    fields?: FieldConfig[];
    submitLabel?: string;
    showTerms?: boolean;
    variant?: "auth" | "register";
}

const defaultFields: FieldConfig[] = [
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
];

const FormUI: React.FC<FormUIProps> = ({
                                           title,
                                           description,
                                           isSubmitting,
                                           fields = defaultFields,
                                           submitLabel = "Sign In",
                                           showTerms = false,
                                           variant = "auth",
                                       }) => {
    const { values } = useFormikContext<any>();

    const isButtonDisabled =
        isSubmitting || (showTerms ? !values.terms : false);

    return (
        <div className={styles.wrapper}>
            <div className={styles.formContainer}>
                <h2 className={styles.title}>{title}</h2>
                {description && (
                    <p className={styles.description}>{description}</p>
                )}

                <Form
                    className={clsx(
                        styles.formContent,
                        styles[variant]
                    )}
                >
                    {fields.map((field) => {
                        // 🌍 country dropdown with search + flag
                        if (field.name === "addressCountry") {
                            return (
                                <CountrySelect
                                    key={field.name}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                />
                            );
                        }

                        return (
                            <InputUI
                                key={field.name}
                                {...field}
                                formik
                            />
                        );
                    })}

                    {/* ✅ Terms checkbox only for register */}
                    {showTerms && (
                        <div className={styles.termsBlock}>
                            <label className={styles.termsLabel}>
                                <Field type="checkbox" name="terms" />
                                <span>
                  I agree to the{" "}
                                    <a
                                        href="/terms-and-conditions"
                                        rel="noopener noreferrer"
                                    >
                    Terms & Conditions
                  </a>
                </span>
                            </label>

                            <ErrorMessage
                                name="terms"
                                component="div"
                                className={styles.errorText}
                            />
                        </div>
                    )}

                    <ButtonUI
                        type="submit"
                        text={submitLabel}
                        disabled={isButtonDisabled}
                        loading={isSubmitting}
                        fullWidth
                    />
                </Form>
            </div>
        </div>
    );
};

export default FormUI;