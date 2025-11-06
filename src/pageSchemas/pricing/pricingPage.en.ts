import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `SEO Plans & Pricing — ${COMPANY_NAME}`,
        description: `Transparent SEO pricing for audits, optimisation, link building and full SEO campaigns. Request your quote today.`,
        keywords: [
            "SEO pricing",
            "SEO packages",
            "SEO services cost",
            "technical SEO audit",
            "link building pricing",
            "local SEO packages",
        ],
        canonical: "/pricing",
    },

    blocks: [
        // 🏁 HERO
        {
            type: "custom",
            component: "HeroSection",
            title: "Choose Your SEO Plan",
            highlight: "Transparent. Effective. Tailored to You.",
            description: `${COMPANY_NAME} offers clear SEO packages for every goal — from one-time technical audits to full monthly optimisation.  
Each plan includes a detailed report and real results tracking.`,
            image: "image18",
            align: "right",
            primaryCta: { text: "Request Consultation", link: "/contact-us" },
        },

        {
            type: "grid",
            columns: 2,
            gap: "2rem",
            cards: [
                {
                    type: "pricing",
                    variant: "starter",
                    title: "Starter SEO Audit",
                    price: "€15",
                    tokens: 1500,
                    badgeTop: "Entry Plan",
                    description:
                        "Get a full site scan, ranking report, and 10-page audit with actionable fixes.",
                    features: [
                        "Technical check",
                        "Mobile performance",
                        "Speed recommendations",
                        "Basic keyword analysis",
                    ],
                    buttonText: "Buy Tokens",
                    buttonLink: "/pricing",
                },
                {
                    type: "pricing",
                    variant: "pro",
                    title: "Full SEO Package",
                    price: "€45",
                    tokens: 4500,
                    badgeTop: "Popular",
                    description:
                        "Everything you need for growth: audit, link strategy, and content plan.",
                    features: [
                        "Complete audit report",
                        "10 backlinks / mo",
                        "Content strategy",
                        "Monthly tracking",
                    ],
                    buttonText: "Start SEO Campaign",
                    buttonLink: "/pricing",
                },
                {
                    type: "pricing",
                    variant: "premium",
                    title: "Enterprise SEO",
                    price: "€90",
                    tokens: 9000,
                    badgeTop: "All-In Plan",
                    description:
                        "For large businesses and e-commerce. Dedicated team, analytics & continuous growth.",
                    features: [
                        "Dedicated SEO manager",
                        "20+ backlinks / mo",
                        "Custom dashboards",
                        "Priority support",
                    ],
                    buttonText: "Contact for Setup",
                    buttonLink: "/contact",
                },
                {
                    type: "pricing",
                    variant: "custom",
                    title: "Custom SEO Solutions",
                    price: "dynamic",
                    tokens: 0,
                    badgeTop: "Tailored Plan",
                    description:
                        "Need something specific? We create bespoke SEO strategies for unique needs.",
                    features: [
                        "Personalised strategy",
                        "Flexible services",
                        "Scalable solutions",
                        "Dedicated support",
                    ],
                    buttonText: "Get a Quote",
                    buttonLink: "/contact",
                }
            ],
        },

        // 🚀 CTA
        {
            type: "custom",
            component: "MissionBanner",
            title: "Get Your Personal SEO Quote",
            description:
                "Contact us today to discuss your goals. We’ll analyse your website and prepare a transparent SEO plan with clear deliverables.",
            image: "ctaPricing",
        },
    ],
};

export default schema;
