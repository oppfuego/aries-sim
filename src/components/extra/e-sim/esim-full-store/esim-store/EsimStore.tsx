"use client";

import {useMemo, useState} from "react";
import styles from "./EsimStore.module.scss";
import {ESIM_COUNTRIES} from "./esimData";
import ButtonUI from "@/components/ui/button/ButtonUI";
import {useRouter} from "next/navigation";
import {useUser} from "@/context/UserContext";

export default function EsimStore() {
    const [query, setQuery] = useState("");
    const [region, setRegion] = useState("all");
    const user = useUser()

    // 💰 pricing
    const EUR_TO_GBP = 0.86;
    const TOKENS_PER_GBP = 100;
    const MARKUP_EUR = 1;

    const euroToTokens = (eur: number) =>
        Math.ceil((eur + MARKUP_EUR) * EUR_TO_GBP * TOKENS_PER_GBP);

    const popular = useMemo(
        () => ESIM_COUNTRIES.filter(c => c.popular),
        []
    );

    const filtered = useMemo(() => {
        return ESIM_COUNTRIES.filter(
            c =>
                !c.popular &&
                c.name.toLowerCase().includes(query.toLowerCase()) &&
                (region === "all" || c.region === region)
        );
    }, [query, region]);

    const router = useRouter();

    return (
        <section className={styles.page}>
            <header className={styles.header}>
                <h1>Global eSIM Store</h1>
                <p>Choose a destination and pay with tokens.</p>
            </header>

            {/* ⭐ POPULAR */}
            {popular.length > 0 && (
                <section className={styles.popularSection}>
                    <h2>Popular destinations</h2>

                    <div className={styles.list}>
                        {popular.map(country => (
                            <div key={country.code} className={`${styles.countryBlock} ${styles.popular}`}>
                                <span className={styles.badge}>Popular</span>

                                <div className={styles.countryHeader}>
                                    <img
                                        src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                                        alt={country.name}
                                    />
                                    <span>{country.name}</span>
                                </div>

                                {country.plans.map((plan, i) => (
                                    <div key={i} className={styles.row}>
                                        <span className={styles.plan}>{plan.label}</span>
                                        <span className={styles.price}>
                      <strong>{euroToTokens(plan.priceEur)}</strong> tokens
                    </span>
                                        <ButtonUI
                                            size="sm"
                                            shape="rounded"
                                            onClick={() => {
                                                router.push(
                                                    user
                                                        ? `/extra/esim-checkout?country=${country.name}&code=${country.code}&plan=${plan.label}&priceEur=${plan.priceEur}`
                                                        : "/sign-in"
                                                );
                                            }}
                                        >
                                            Buy
                                        </ButtonUI>

                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* FILTERS */}
            <div className={styles.filters}>
                <input
                    placeholder="Search country"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />

                <select value={region} onChange={e => setRegion(e.target.value)}>
                    <option value="all">All regions</option>
                    <option value="europe">Europe</option>
                    <option value="asia">Asia</option>
                    <option value="americas">Americas</option>
                    <option value="africa">Africa</option>
                    <option value="oceania">Oceania</option>
                </select>
            </div>

            <h2 className={styles.allTitle}>All destinations</h2>

            <div className={styles.list}>
                {filtered.map(country => (
                    <div key={country.code} className={styles.countryBlock}>
                        <div className={styles.countryHeader}>
                            <img
                                src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                                alt={country.name}
                            />
                            <span>{country.name}</span>
                        </div>

                        {country.plans.map((plan, i) => (
                            <div key={i} className={styles.row}>
                                <span className={styles.plan}>{plan.label}</span>
                                <span className={styles.price}>
                  <strong>{euroToTokens(plan.priceEur)}</strong> tokens
                </span>
                                <ButtonUI
                                    size="sm"
                                    shape="rounded"
                                    onClick={() => {
                                        router.push(
                                            `/extra/esim-checkout?country=${country.name}&code=${country.code}&plan=${plan.label}&priceEur=${plan.priceEur}`
                                        );
                                    }}
                                >
                                    Buy
                                </ButtonUI>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
