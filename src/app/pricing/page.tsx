"use client";

import HeroSection from "@/components/constructor/hero/Hero";
import Grid from "@/components/constructor/grid/Grid";
import PricingCard from "@/components/constructor/pricing-card/PricingCard";
import HighlightStrip from "@/components/constructor/highlight-strip/HighlightStrip";
import Section from "@/components/constructor/section/Section";
import ValuesIcons from "@/components/constructor/values-icons/ValuesIcons";
import LogoBlock from "@/components/constructor/logo-block/LogoBlock";
import Card from "@/components/constructor/card/Card";
import {COMPANY_NAME} from "@/resources/constants";
import InfoBlock from "@/components/constructor/Info-block/InfoBlock";

export default function PricingPage() {
    return (
        <>

            <Grid
                title="Flexible Pricing — Pay Only for Data You Need"
                description="No subscriptions. No hidden fees. Use your balance anytime."
                columns={4}
                gap="2rem"
            >
                <PricingCard
                    index={0}
                    variant="starter"
                    title="Traveler Starter"
                    price="€5"
                    tokens={500}
                    badgeTop="Starter"
                    description="Best for short trips and light data usage."
                    features={[
                        "Instant eSIM delivery",
                        "Multiple country plans",
                        "Secure payments",
                        "No expiration",
                    ]}
                    buttonText="Top Up Balance"
                />

                <PricingCard
                    index={1}
                    variant="pro"
                    title="Frequent Traveler"
                    price="€15"
                    tokens={1500}
                    badgeTop="Popular"
                    description="Perfect for multi-country trips and longer stays."
                    features={[
                        "Regional & global plans",
                        "Fast LTE / 5G speeds",
                        "Hotspot support",
                        "Priority support",
                    ]}
                    buttonText="Get Started"
                />

                <PricingCard
                    index={2}
                    variant="premium"
                    title="Unlimited Explorer"
                    price="€50"
                    tokens={5000}
                    badgeTop="Best Value"
                    description="For heavy data users and long-term travel."
                    features={[
                        "Unlimited plans available",
                        "Best network coverage",
                        "Multiple active eSIMs",
                        "Premium support",
                    ]}
                    buttonText="Choose Plan"
                />

                <PricingCard
                    index={3}
                    variant="custom"
                    title="Custom Balance"
                    price="dynamic"
                    tokens={0}
                    badgeTop="Flexible"
                    description="Add any amount and use it whenever you need."
                    features={[
                        "Flexible top-up",
                        "No subscriptions",
                        "Any destination",
                        "Use anytime",
                    ]}
                    buttonText="Continue"
                />
            </Grid>

            <Grid
                columns={3}
                gap="2rem"
                title="How It Works"
                description="Getting started with our eSIM is quick and easy">

                <Card
                    icon="📲"
                    title="Choose Destination"
                    description="Select your country or region and preferred data plan."
                />
                <Card
                    icon="💳"
                    title="Pay with Tokens"
                    description="Use your balance or top up instantly with secure payment."
                />
                <Card
                    icon="📡"
                    title="Activate eSIM"
                    description="Scan QR code and enjoy instant mobile internet."
                />
            </Grid>

            <ValuesIcons
                title="Why Choose Our eSIM"
                description="Built for travelers, digital nomads, and global teams"
                values={[
                    {
                        icon: "globe",
                        title: "Global Coverage",
                        description: "Reliable connections in 190+ countries worldwide.",
                    },
                    {
                        icon: "zap",
                        title: "Instant Setup",
                        description: "No waiting, no shipping. Activate in minutes.",
                    },
                    {
                        icon: "shield",
                        title: "Secure & Private",
                        description: "Your data is protected with top-grade security.",
                    },
                    {
                        icon: "wallet",
                        title: "Pay-as-you-go",
                        description: "No contracts. No monthly fees. Full control.",
                    },
                ]}
            />

            {/* ================= FINAL CTA ================= */}
            <Section
                reverse
                left={
                    <InfoBlock
                        title="Ready to Get Connected?"
                        description="Choose your destination, activate eSIM, and stay online anywhere in the world."
                        bullets={[
                            "No physical SIM cards",
                            "Works with eSIM-compatible devices",
                            "24/7 support",
                        ]}
                    />
                }
                right={
                    <InfoBlock
                        image="image1"
                        align="center"
                    />
                }
            />
        </>
    );
}
