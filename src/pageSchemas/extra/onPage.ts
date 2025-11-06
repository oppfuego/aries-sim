import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `On-Page SEO Optimisation — ${COMPANY_NAME}`,
        description: `Full on-page SEO optimisation by ${COMPANY_NAME}: improve your content structure, metadata, and keyword relevance to increase visibility and organic traffic.`,
        keywords: [
            "on-page SEO",
            "content optimisation",
            "meta tags SEO",
            "keyword mapping",
            "SEO for pages",
            "improve CTR SEO",
        ],
        canonical: "/cases/on-page-seo",
    },

    blocks: [
        // 🏁 HERO
        {
            type: "custom",
            component: "HeroSection",
            title: "On-Page SEO Optimisation",
            highlight: "Optimise. Structure. Convert.",
            description: `${COMPANY_NAME} performs deep on-page optimisation to make every page of your website search-engine friendly and conversion-focused.  
We adjust technical tags, structure, and content to maximise visibility and user engagement.`,
            image: "image7",
            align: "right",
            primaryCta: { text: "Request Optimisation", link: "/contact-us?service=On-Page SEO&tokens=30" },
        },

        // 💡 INTRO: Why On-Page SEO matters
        {
            type: "custom",
            component: "InfoBlock",
            title: "Why On-Page SEO Is Essential",
            description: `Even the best content can fail to rank if your pages aren’t optimised for search intent, structure, and UX.  
Our team ensures that every page communicates clearly with Google — and convinces your users to stay longer.`,
            bullets: [
                "Better keyword targeting & semantic structure",
                "Improved CTR through optimised titles and descriptions",
                "Enhanced internal linking and hierarchy",
                "Stronger user signals (time on page, bounce rate)",
            ],
            align: "center",
        },

        // 🧩 PROCESS — how we work
        {
            type: "custom",
            component: "Timeline",
            title: "How We Optimise Your Pages",
            steps: [
                {
                    title: "1. Content & Keyword Audit",
                    description:
                        "We review all existing pages, analyse keyword distribution, and detect duplicate or missing metadata.",
                },
                {
                    title: "2. Keyword Mapping",
                    description:
                        "Each page is matched with high-intent keywords to ensure search relevance and avoid cannibalisation.",
                },
                {
                    title: "3. Metadata & Headings Optimisation",
                    description:
                        "We rewrite meta titles, descriptions, and headings for clarity, click-through rate, and semantic balance.",
                },
                {
                    title: "4. Content & UX Adjustments",
                    description:
                        "We improve internal linking, image alt texts, and content readability — making pages stronger for SEO and users.",
                },
                {
                    title: "5. Reporting & Implementation Guide",
                    description:
                        "You receive a full report with all changes, keyword mapping sheet, and clear implementation steps.",
                },
            ],
        },

        // 📊 RESULTS / BENEFITS
        {
            type: "custom",
            component: "ValuesIcons",
            title: "What You’ll Gain with On-Page SEO",
            description: "Precise optimisation brings measurable improvements across performance, visibility, and engagement.",
            values: [
                { icon: "🔑", title: "Keyword Relevance", text: "Each page targets the right queries for your audience." },
                { icon: "📈", title: "Higher Click-Through Rate", text: "Optimised titles and meta descriptions attract more clicks." },
                { icon: "🧩", title: "Better Page Structure", text: "Improved hierarchy and headings help both users and crawlers." },
                { icon: "👥", title: "Improved User Signals", text: "Longer sessions and better conversions through usability." },
            ],
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

        // 💬 TESTIMONIALS
        {
            type: "custom",
            component: "TestimonialsSlider",
            title: "Real Results from On-Page Optimisation",
            description: "Our clients see instant ranking improvements and measurable traffic growth after our adjustments.",
            testimonials: [
                {
                    name: "Kateryna S.",
                    role: "Marketing Director, IT Company",
                    image: "review4",
                    text: "After their on-page optimisation, our organic CTR grew by 45% and we entered the top-10 for 12 core keywords within two months.",
                    rating: 5,
                },
                {
                    name: "Roman D.",
                    role: "Owner, Local Service Website",
                    image: "review6",
                    text: "The keyword mapping and metadata rewrite gave immediate visibility boost — now 80% of our pages rank in Google’s first page.",
                    rating: 5,
                },
            ],
        },

        // 📩 TEXT + BUTTON CTA
        {
            type: "custom",
            component: "TextWithButton",
            title: "Ready to Optimise Your Website?",
            description: `Let our SEO specialists review your pages and build a custom on-page optimisation plan that drives rankings and engagement.`,
            buttonText: "Order On-Page SEO",
            buttonLink: "/contact-us",
        },

        // 🚀 FINAL CTA Banner
        {
            type: "custom",
            component: "MissionBanner",
            title: "Boost Your Visibility with Smart On-Page SEO",
            description: `Every page matters. ${COMPANY_NAME} ensures each one is perfectly structured, keyword-aligned, and ready to perform.`,
            image: "ctaOnPage",
        },
    ],
};

export default schema;
