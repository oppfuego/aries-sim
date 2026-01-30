
import type { Metadata } from "next";
import { COMPANY_NAME } from "@/resources/constants";

import HeroSection from "@/components/constructor/hero/Hero";
import ValuesIcons from "@/components/constructor/values-icons/ValuesIcons";
import Grid from "@/components/constructor/grid/Grid";
import Card from "@/components/constructor/card/Card";
import FAQ from "@/components/constructor/faq/FAQ";
import EsimStorefront from "@/components/extra/e-sim/esim-store-front/EsimStorefront";
import PricingCard from "@/components/constructor/pricing-card/PricingCard";
import TestimonialsSlider from "@/components/constructor/testimonials-slider/TestimonialsSlider";

export const metadata: Metadata = {
    title: `${COMPANY_NAME} — Global eSIM Marketplace for Travelers`,
    description:
        "Buy global eSIM data plans for travel. Instant activation, no roaming fees, coverage in 200+ countries.",
    keywords: [
        "eSIM",
        "travel eSIM",
        "global eSIM",
        "mobile data abroad",
        "eSIM marketplace",
        "international data plans",
    ],
    alternates: {
        canonical: "/",
    },
};

export default function HomePage() {
    return (
        <>
            <HeroSection
                title="Global Mobile Internet. No Roaming. No SIM Cards."
                description={`${COMPANY_NAME} is a global eSIM marketplace for travelers. Buy mobile data plans for 200+ countries and get online instantly.`}
                primaryCta={{ text: "Browse eSIM Plans", link: "/extra/esim-store" }}
                image="image1"
                showTrustBadge={false}
            />

            <ValuesIcons
                title="Why Travelers Choose Our eSIM"
                description="Stay connected worldwide with instant eSIM activation. No physical SIM cards, no roaming surprises."
                values={[
                    {
                        icon: "globe",
                        title: "Worldwide Coverage",
                        text: "Mobile data in 200+ countries and regions across the globe.",
                    },
                    {
                        icon: "speed",
                        title: "Instant Activation",
                        text: "Buy, install, and go online in minutes — no waiting.",
                    },
                    {
                        icon: "sim",
                        title: "100% Digital eSIM",
                        text: "No physical SIM cards, no stores, no swapping.",
                    },
                    {
                        icon: "shield",
                        title: "Reliable & Secure",
                        text: "Stable speeds, trusted networks, and secure connections.",
                    },
                ]}
            />

            <Grid
                title="How It Works — Get Connected in 6 Simple Steps"
                columns={3}
                gap="2rem"
            >
                <Card
                    icon="login"
                    title="1. Create an Account"
                    description="Sign up to manage your eSIMs, purchases, and balance in one place."
                    buttonText="Create Account"
                    buttonLink="/sign-up"
                />

                <Card
                    icon="wallet"
                    title="2. Top Up Balance"
                    description="Add funds once and use them to buy eSIM plans anytime."
                    buttonText="Top Up Balance"
                    buttonLink="/pricing"
                />

                <Card
                    icon="sim"
                    title="3. Choose an eSIM Plan"
                    description="Select a country or regional data plan that fits your trip."
                    buttonText="Open Marketplace"
                    buttonLink="/esim-store"
                />

                <Card
                    icon="pay"
                    title="4. Purchase eSIM"
                    description="Pay securely and receive your eSIM instantly."
                    buttonText="Buy eSIM"
                    buttonLink="/esim-store"
                />

                <Card
                    icon="mail"
                    title="5. Receive Setup Details"
                    description="Get your QR code and activation instructions by email."
                    buttonText="Check Email"
                    buttonLink="/contact-us"
                />

                <Card
                    icon="call"
                    title="6. Activate & Travel"
                    description="Scan the QR code, activate your eSIM, and enjoy mobile internet."
                />
            </Grid>

            <EsimStorefront
                title="eSIM for Popular Countries & Regions"
                description="Choose your destination and plan."
            />


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
                        "Fast LTE/5G speeds",
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

            <TestimonialsSlider
                title="What Travelers Say About Our eSIM"
                description="Trusted by travelers worldwide for fast and reliable mobile internet."
                testimonials={[
                    {
                        name: "Leon Sutherland",
                        image: "review9",
                        text:
                            "Bought the eSIM before my trip to Australia. Activated it at the airport and had fast internet immediately. No roaming issues at all.",
                    },
                    {
                        name: "Anna Peterson",
                        image: "review12",
                        text:
                            "Installed the eSIM in under 5 minutes. Worked perfectly across multiple countries during my trip. Super convenient and reliable.",
                    },
                    {
                        name: "Marco Rossi",
                        image: "review10",
                        text:
                            "Very reliable connection with clear setup instructions. Saved me a lot of money compared to traditional roaming plans.",
                    },
                    {
                        name: "Sofia Martinez",
                        image: "review13",
                        text:
                            "Customer support was quick and helpful when I had questions about my plan. The eSIM worked flawlessly throughout my journey.",
                    },
                    {
                        name: "Daniel Kim",
                        image: "review11",
                        text:
                            "Used this eSIM while traveling across Asia and Europe. Fast speeds, easy activation, and no need to swap SIM cards.",
                    },
                ]}
            />

            <FAQ
                items={[
                    {
                        question: "What is an eSIM?",
                        answer:
                            "An eSIM is a digital SIM that allows you to activate a mobile data plan without inserting a physical SIM card.",
                    },
                    {
                        question: "When will my eSIM be delivered?",
                        answer:
                            "Your eSIM is delivered instantly after purchase. You’ll receive a QR code and setup instructions right away.",
                    },
                    {
                        question: "How do I install my eSIM?",
                        answer:
                            "Simply scan the QR code provided after purchase or follow the manual installation steps on your device.",
                    },
                    {
                        question: "Do I need to remove my physical SIM?",
                        answer:
                            "No. You can keep your physical SIM for calls and SMS while using eSIM for mobile data.",
                    },
                    {
                        question: "Is my device compatible with eSIM?",
                        answer:
                            "Most modern smartphones support eSIM, including recent iPhone, Samsung, and Google Pixel models.",
                    },
                    {
                        question: "Can I use eSIM in multiple countries?",
                        answer:
                            "Yes. You can choose country-specific, regional, or global eSIM plans depending on your travel needs.",
                    },
                    {
                        question: "When does the data plan start?",
                        answer:
                            "Your plan activates when the eSIM first connects to a supported mobile network, not at the time of purchase.",
                    },
                    {
                        question: "What happens if I run out of data?",
                        answer:
                            "You can easily purchase another plan or top up your balance with tokens at any time.",
                    },
                ]}
            />

        </>
    );
}