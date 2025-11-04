"use client";

import React, {useEffect, useState} from "react";
import {headerContent} from "@/resources/content";
import styles from "./Header.module.scss";
import {IconButton} from "@mui/material";
import {FaBars} from "react-icons/fa";
import {useUser} from "@/context/UserContext";
import Image from "next/image";
import AuthButtons from "@/components/widgets/auth-buttons/AuthButtons";
import {headerStyles} from "@/resources/styles-config";
import DrawerMenu from "@/components/ui/drawer/Drawer";
import {useCurrency} from "@/context/CurrencyContext";
import {motion} from "framer-motion";
import {IoMdArrowDropright} from "react-icons/io";
import CurrencySwitch from "@/components/widgets/currency-switch/CurrencySwitch";

const Header: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const user = useUser();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // динамічні стилі при скролі
    const scrolledStyle: React.CSSProperties = {};
    if (isScrolled && headerStyles.type !== "default") {
        switch (headerStyles.scrollMode) {
            case "solid":
                scrolledStyle.backgroundColor = headerStyles.scrollBackground;
                break;
            case "blur":
                scrolledStyle.backdropFilter = `blur(${headerStyles.scrollBlur})`;
                scrolledStyle.backgroundColor = "rgba(255,255,255,0.05)";
                break;
        }
    }

    return (
        <>
            <motion.header
                className={[
                    headerStyles.type === "sticky" && styles.sticky,
                    isScrolled ? styles.scrolled : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
                style={scrolledStyle}
                initial={{opacity: 0, y: -40}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, ease: "easeOut"}}
            >
                <div className={styles.headerInner}>
                    {/* Ліва частина — логотип */}
                    <a href={headerContent.logo.href} className={styles.logo}>
                        <Image
                            width={190}
                            height={60}
                            src={headerContent.logo.src}
                            alt={headerContent.logo.alt}
                        />
                    </a>

                    {/* Центр — навігація */}
                    <nav className={styles.nav}>
                        {headerContent.links.map((link) => (
                            <a key={link.label} href={link.href} className={styles.link}>
                                {link.label}
                            </a>
                        ))}
                        {/* 🔽 Dropdown 1 — Services */}
                        <div className={styles.dropdown}>
                            <button className={styles.dropbtn}>
                                Services
                                <span className={styles.arrow}><IoMdArrowDropright/></span>
                            </button>
                            <div className={styles.dropdownMenu}>
                                <a href="/seo" className={styles.dropdownLink}>Technical Website Audit</a>
                                <a href="/smm" className={styles.dropdownLink}>On-Page SEO</a>
                                <a href="/audit" className={styles.dropdownLink}>Off-Page SEO</a>
                                <a href="/audit" className={styles.dropdownLink}>Local SEO</a>
                                <a href="/audit" className={styles.dropdownLink}>SEO Copywriting</a>
                                <a href="/audit" className={styles.dropdownLink}>Competitor Analysis</a>
                            </div>
                        </div>

                        {/* 🔽 Dropdown 2 — Resources */}
                        <div className={styles.dropdown}>
                            <button className={styles.dropbtn}>
                                Resources
                                <span className={styles.arrow}>
                                   <IoMdArrowDropright/>
                                </span>
                            </button>
                            <div className={styles.dropdownMenu}>
                                <a href="/pricing" className={styles.dropdownLink}>Pricing</a>
                                <a href="/faq" className={styles.dropdownLink}>FAQ</a>
                                <a href="/contact" className={styles.dropdownLink}>Contact Us</a>
                            </div>
                        </div>
                    </nav>


                    {/* Права частина — кнопки */}
                    {/*<div className={styles.actionsNav}>
                        <AuthButtons/>
                        <div className={styles.currencySwitch}>
                            <div
                                className={`${styles.toggle} ${currency === "EUR" ? styles.active : ""}`}
                                onClick={() => setCurrency(currency === "GBP" ? "EUR" : "GBP")}
                            >
                                <span className={styles.labelLeft}>GBP</span>
                                <span className={styles.labelRight}>EUR</span>
                                <div className={styles.thumb}/>
                            </div>
                        </div>
                    </div>*/}

                    <div className={styles.actionsNav}>
                        <AuthButtons/>
                        <CurrencySwitch/>
                    </div>


                    {/* Mobile menu */}
                    <div className={styles.menuButton}>
                        <IconButton
                            onClick={() => setDrawerOpen(true)}
                            aria-label="Open navigation"
                            className={styles.button}
                        >
                            <FaBars className={styles.button}/>
                        </IconButton>
                    </div>
                </div>
            </motion.header>

            <DrawerMenu open={drawerOpen} onClose={() => setDrawerOpen(false)}/>
        </>
    );
};

export default Header;
