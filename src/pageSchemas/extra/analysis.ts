import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `Competitor Analysis — ${COMPANY_NAME}`,
        description: `Understand your competition with ${COMPANY_NAME}. We analyse SEO strategies, keywords, backlinks, and content of your top rivals to help you outrank them.`,
        keywords: [
            "competitor analysis",
            "SEO competitor research",
            "keyword gap analysis",
            "backlink comparison",
            "SEO strategy",
            "competitive SEO audit",
        ],
        canonical: "/cases/competitor-analysis",
    },

    blocks: [
        // 🏁 HERO
        {
            type: "custom",
            component: "HeroSection",
            title: "Competitor Analysis",
            highlight: "Know Your Rivals. Lead the Market.",
            description: `${COMPANY_NAME} helps you understand exactly why your competitors rank higher —  
and how to beat them. We analyse their SEO strategy, backlinks, content, and keywords to uncover growth opportunities for your brand.`,
            image: "image11",
            align: "right",
            primaryCta: { text: "Request Competitor Audit", link: "/contact-us?service=Competitor%20Analysis&tokens=30" },
        },

        // 💡 INTRO
        {
            type: "custom",
            component: "InfoBlock",
            title: "Why Competitor Analysis Matters",
            description: `Without understanding your competition, it’s easy to waste resources targeting the wrong keywords or content.  
Our analysis gives you clarity — showing what works in your niche and how to overtake market leaders.`,
            bullets: [
                "Identify gaps in keywords and content",
                "Understand competitor backlink profiles",
                "Reveal technical and UX advantages",
                "Build data-driven SEO strategies",
            ],
            align: "center",
        },

        // 🧩 PROCESS
        {
            type: "custom",
            component: "Timeline",
            title: "Our Competitor Analysis Process",
            steps: [
                {
                    title: "1. Market & Competitor Identification",
                    description:
                        "We determine your main organic competitors — not just by brand, but by the keywords you compete for.",
                },
                {
                    title: "2. Keyword & Content Gap Audit",
                    description:
                        "We compare your keyword coverage and content depth to your competitors’ top-ranking pages.",
                },
                {
                    title: "3. Backlink & Authority Analysis",
                    description:
                        "We evaluate where your competitors get backlinks from — and find link-building opportunities for you.",
                },
                {
                    title: "4. On-Page & UX Comparison",
                    description:
                        "We analyse title tags, meta data, structure, and page experience to identify what gives them an edge.",
                },
                {
                    title: "5. Strategy & Action Report",
                    description:
                        "You receive a detailed report with competitor metrics, gaps, and actionable recommendations for faster ranking growth.",
                },
            ],
        },

        // 📈 RESULTS / BENEFITS
        {
            type: "custom",
            component: "ValuesIcons",
            title: "What You’ll Gain from Competitor Analysis",
            description:
                "Get a clear vision of your market landscape — and a roadmap to outperform your rivals.",
            values: [
                { icon: "🔎", title: "Keyword Opportunities", text: "Discover high-value keywords your competitors already rank for." },
                { icon: "💡", title: "Actionable Insights", text: "Learn what content formats and strategies perform best." },
                { icon: "🔗", title: "Link Building Prospects", text: "Reveal where competitors get their backlinks — and how to get yours there too." },
                { icon: "🚀", title: "Strategic Roadmap", text: "Turn insights into a step-by-step SEO action plan." },
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
            title: "Client Success with Competitor Research",
            description: "Our clients use competitive analysis as a springboard for powerful SEO strategies.",
            testimonials: [
                {
                    name: "Oleh K.",
                    role: "CEO, Logistics Platform",
                    image: "review4",
                    text: "Their competitor report completely reshaped our SEO strategy — we discovered missed keyword clusters and overtook two top rivals within 3 months.",
                    rating: 5,
                },
                {
                    name: "Yulia R.",
                    role: "Marketing Manager, SaaS Startup",
                    image: "review1",
                    text: "The backlink comparison and keyword gap audit gave us clear direction — finally, SEO decisions backed by data, not guesses.",
                    rating: 5,
                },
            ],
        },

        // 📩 CTA text + button
        {
            type: "custom",
            component: "TextWithButton",
            title: "Ready to Outrank Your Competitors?",
            description: `Let ${COMPANY_NAME} analyse your top rivals and uncover SEO opportunities to push your brand to the top.`,
            buttonText: "Get Competitor Report",
            buttonLink: "/contact-us",
        },

        // 🚀 FINAL CTA banner
        {
            type: "custom",
            component: "MissionBanner",
            title: "Turn Insights into SEO Advantage",
            description: `Competitor analysis is the foundation of every winning SEO strategy.  
Work with ${COMPANY_NAME} and start making data-driven decisions today.`,
            image: "ctaCompetitor",
        },
    ],
};

export default schema;
