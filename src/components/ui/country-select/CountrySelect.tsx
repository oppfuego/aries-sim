"use client";

import React from "react";
import { useField } from "formik";
import FormControl from "@mui/joy/FormControl";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import { ChevronDown } from "lucide-react";
import styles from "./CountrySelect.module.scss";
import { allowedRegistrationCountries } from "@/resources/countries";

interface Props {
    name: string;
    placeholder?: string;
}

const CountrySelect: React.FC<Props> = ({ name, placeholder }) => {
    const [field, meta, helpers] = useField<string>(name);

    return (
        <FormControl error={Boolean(meta.touched && meta.error)} className={styles.wrapper}>
            <Select
                name={name}
                value={field.value || null}
                placeholder={placeholder || "Select your country"}
                indicator={<ChevronDown size={18} />}
                onChange={(_, value) => helpers.setValue(value || "")}
                onBlur={() => helpers.setTouched(true)}
                className={styles.control}
                slotProps={{
                    button: {
                        className: styles.button,
                    },
                    listbox: {
                        className: styles.listbox,
                    },
                }}
                sx={{
                    width: "100%",
                    minHeight: "52px",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    backgroundColor: "#fff",
                    "--Select-placeholderColor": "var(--text-secondary)",
                    "--Select-focusedThickness": "1px",
                    "--Select-indicatorColor": "var(--text-secondary)",
                    "--Select-paddingInline": "18px",
                }}
            >
                {allowedRegistrationCountries.map((country) => (
                    <Option key={country.code} value={country.name} className={styles.option}>
                        {country.name}
                    </Option>
                ))}
            </Select>

            {meta.touched && meta.error && (
                <div className={styles.error}>{meta.error}</div>
            )}
        </FormControl>
    );
};

export default CountrySelect;
