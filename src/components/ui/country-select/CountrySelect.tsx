"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import { useField } from "formik";
import styles from "./CountrySelect.module.scss";
import { countries } from "@/resources/countries";

interface Props {
    name: string;
    placeholder?: string;
}

const CountrySelect: React.FC<Props> = ({ name, placeholder }) => {
    const [field, meta, helpers] = useField(name);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);

    const selected = countries.find(c => c.code === field.value);

    const filtered = useMemo(() => {
        return countries.filter(c =>
            c.name.toLowerCase().includes(query.toLowerCase())
        );
    }, [query]);

    // ✅ CLOSE ON OUTSIDE CLICK
    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            {/* CONTROL */}
            <div
                className={styles.control}
                onClick={() => setOpen(v => !v)}
            >
                {selected ? (
                    <span className={styles.value}>
                        <span>{selected.name}</span>
                    </span>
                ) : (
                    <span className={styles.placeholder}>
                        {placeholder || "Select country"}
                    </span>
                )}
            </div>

            {/* DROPDOWN */}
            {open && (
                <div className={styles.dropdown}>
                    <input
                        className={styles.search}
                        placeholder="Search country…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />

                    <div className={styles.list}>
                        {filtered.map((country) => (
                            <div
                                key={country.code}
                                className={styles.option}
                                onClick={() => {
                                    helpers.setValue(country.code);
                                    setOpen(false);
                                    setQuery("");
                                }}
                            >
                                <span className={styles.name}>{country.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {meta.touched && meta.error && (
                <div className={styles.error}>{meta.error}</div>
            )}
        </div>
    );
};

export default CountrySelect;