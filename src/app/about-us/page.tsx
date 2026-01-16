"use client";

import HeroSection from "@/components/constructor/hero/Hero";
import Section from "@/components/constructor/section/Section";
import Grid from "@/components/constructor/grid/Grid";
import Card from "@/components/constructor/card/Card";
import ValuesIcons from "@/components/constructor/values-icons/ValuesIcons";
import InfoBlock from "@/components/constructor/Info-block/InfoBlock";
import MissionBanner from "@/components/constructor/missio-banner/MissionBanner";

export default function AboutEsimPage() {
    return (
        <>
            {/* ================= HERO ================= */}
            <HeroSection
                title="Global eSIM for Travel. No Roaming. No Hassle."
                description="We help travelers stay connected worldwide with instant eSIM plans.
No physical SIM cards, no roaming fees — just fast mobile data wherever you go."
                image="image9"
                primaryCta={{text: "Browse eSIM Plans", link: "/extra/esim-store"}}
            />

            {/* ================= WHAT IS ESIM ================= */}
            <Section
                title="What Is Our eSIM Marketplace?"
                description="A modern alternative to traditional SIM cards, designed for travelers."
                left={
                    <InfoBlock
                        title="One eSIM. Global Internet."
                        description="Our marketplace gives you access to mobile data plans from local carriers worldwide — without contracts, roaming fees, or physical SIM cards."
                        bullets={[
                            "Instant activation after purchase",
                            "Works on iOS & Android devices",
                            "No roaming or surprise charges",
                            "Pay only for the data you need",
                        ]}
                    />
                }
                right={<InfoBlock image="image18" align="center"/>}
            />

            {/* ================= MISSION ================= */}
            <Section
                title="Our Mission"
                description="Making global connectivity simple, affordable, and instant."
                left={<InfoBlock image="image19" align="center"/>}
                right={
                    <InfoBlock
                        title="Connecting Travelers Without Borders"
                        description="We believe staying connected while traveling should be effortless.
Our mission is to remove telecom complexity and give travelers reliable internet anywhere in the world."
                        bullets={[
                            "Digital-first eSIM technology",
                            "Transparent pricing",
                            "Trusted mobile networks",
                            "Built for modern travelers",
                        ]}
                    />
                }
            />

            {/* ================= VALUES ================= */}
            <Section
                title="Our Core Values"
                description="Principles that shape our eSIM platform."
                left={
                    <Grid columns={3} gap="1.5rem">
                        <Card
                            icon="🌍"
                            title="Global First"
                            description="Designed for travelers across borders."
                        />
                        <Card
                            icon="⚡"
                            title="Instant Access"
                            description="Connect in minutes, not hours."
                        />
                        <Card
                            icon="🔍"
                            title="Transparency"
                            description="Clear pricing with no hidden fees."
                        />
                    </Grid>
                }
            />

            {/* ================= INTERESTING FACTS ================= */}
            <ValuesIcons
                title="Interesting Facts About Our eSIM Platform"
                description="What makes our marketplace trusted by travelers worldwide."
                values={[
                    {
                        icon: "globe",
                        title: "100+ Countries",
                        description: "Local mobile networks worldwide",
                    },
                    {
                        icon: "sim",
                        title: "Instant eSIM",
                        description: "Activate in under 2 minutes",
                    },
                    {
                        icon: "speed",
                        title: "4G / 5G Speed",
                        description: "Fast mobile internet abroad",
                    },
                    {
                        icon: "wallet",
                        title: "No Roaming Fees",
                        description: "Pay only for the data you need",
                    },
                    {
                        icon: "phone",
                        title: "iOS & Android",
                        description: "Compatible with modern smartphones",
                    },
                    {
                        icon: "shield",
                        title: "Secure Payments",
                        description: "Protected & trusted transactions",
                    },
                    {
                        icon: "pay",
                        title: "Multiple Currencies",
                        description: "Pay in your preferred currency",
                    },
                    {
                        icon: "login",
                        title: "Easy Setup",
                        description: "No contracts or registrations",
                    }
                ]}
            />

            {/* ================= USE CASES ================= */}
            <Section
                title="Who Is This For?"
                description="Built for every type of traveler."
                left={
                    <Grid columns={3} gap="1.5rem">
                        <Card
                            icon="✈️"
                            title="Tourists"
                            description="Stay connected while exploring new countries."
                        />
                        <Card
                            icon="💼"
                            title="Business Travelers"
                            description="Reliable internet for work and meetings."
                        />
                        <Card
                            icon="🎒"
                            title="Digital Nomads"
                            description="Flexible plans across multiple countries."
                        />
                    </Grid>
                }
            />

            {/* ================= TRUST ================= */}
            <Section
                title="Built for Reliability & Security"
                left={
                    <Grid columns={3} gap="1.5rem">
                        <Card
                            icon="🔒"
                            title="Secure Payments"
                            description="Trusted providers & encrypted transactions."
                        />
                        <Card
                            icon="📡"
                            title="Top Mobile Networks"
                            description="Partnerships with leading carriers."
                        />
                        <Card
                            icon="🧑‍💻"
                            title="Human Support"
                            description="Real people ready to help you."
                        />
                    </Grid>
                }
            />

            {/* ================= FINAL CTA ================= */}
            <MissionBanner
                title="Stay Connected Anywhere"
                description="Buy your eSIM in minutes and enjoy mobile internet worldwide — without roaming."
                image="image10"
            />
        </>
    );
}
