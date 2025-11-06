import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `SEO Copywriting — ${COMPANY_NAME}`,
        description: `Professional SEO copywriting services by ${COMPANY_NAME}: content that ranks, converts, and builds your brand authority.`,
        keywords: [
            "SEO copywriting",
            "SEO content writing",
            "website copy optimisation",
            "keyword-rich content",
            "blog writing SEO",
            "landing page SEO",
        ],
        canonical: "/cases/seo-copywriting",
    },

    blocks: [
        // 🏁 HERO
        {
            type: "custom",
            component: "HeroSection",
            title: "SEO Copywriting",
            highlight: "Write. Rank. Convert.",
            description: `${COMPANY_NAME} creates content that not only sounds good — it ranks.  
Our SEO copywriters craft landing pages, blog posts, and product descriptions optimised for both users and search engines.`,
            image: "image12",
            align: "right",
            primaryCta: { text: "Order SEO Copy", link: "/contact-us?service=SEO%20Copywriting&tokens=30" },
        },

        // 💡 INTRO
        {
            type: "custom",
            component: "InfoBlock",
            title: "Why SEO Copywriting Matters",
            description: `Without high-quality content, even the most optimised website won’t perform.  
We combine marketing psychology, keyword strategy, and storytelling to create pages that bring both traffic and conversions.`,
            bullets: [
                "Keyword-rich yet natural writing",
                "Optimised structure and readability",
                "Unique tone and brand consistency",
                "SEO-driven CTAs and engagement",
            ],
            align: "center",
        },

        // 🧠 PROCESS
        {
            type: "custom",
            component: "Timeline",
            title: "Our Copywriting Process",
            steps: [
                {
                    title: "1. Keyword & Intent Research",
                    description:
                        "We identify target queries and analyse what content ranks best for your audience’s intent.",
                },
                {
                    title: "2. Content Outline Creation",
                    description:
                        "We build a logical structure with keyword placement, headings, and storytelling flow.",
                },
                {
                    title: "3. Writing & Optimisation",
                    description:
                        "Our copywriters craft engaging text optimised for readability, CTR, and SEO metrics.",
                },
                {
                    title: "4. Internal Linking & Meta Setup",
                    description:
                        "We prepare metadata, titles, and add contextual internal links for higher relevance.",
                },
                {
                    title: "5. Review & Publishing Guide",
                    description:
                        "You receive polished text ready for upload — or we handle the publishing for you.",
                },
            ],
        },

        // 📈 BENEFITS
        {
            type: "custom",
            component: "ValuesIcons",
            title: "What You’ll Gain from SEO Copywriting",
            description: "Content that ranks, builds trust, and sells.",
            values: [
                { icon: "📝", title: "Optimised Content", text: "Texts crafted to perform well on Google and engage users." },
                { icon: "🎯", title: "Keyword Strategy", text: "Focused writing that drives organic traffic." },
                { icon: "💬", title: "Brand Voice", text: "Every page written in your tone and style." },
                { icon: "💰", title: "Conversions", text: "Copy that not only informs — it sells." },
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
            title: "Client Results from Our Copywriting",
            description: "Our content has helped clients grow visibility, clicks, and conversions.",
            testimonials: [
                {
                    name: "Olha T.",
                    role: "Head of Marketing, Online Store",
                    image: "review6",
                    text: "Their SEO articles consistently bring organic traffic — 60% growth in blog visitors after optimisation.",
                    rating: 5,
                },
                {
                    name: "Denys P.",
                    role: "Founder, Digital Agency",
                    image: "review2",
                    text: "Finally, content that sells and ranks. CTR up by 38% and average session time doubled.",
                    rating: 5,
                },
            ],
        },

        // 📩 CTA
        {
            type: "custom",
            component: "TextWithButton",
            title: "Need Content That Works?",
            description: `Let ${COMPANY_NAME} write pages that search engines love and readers trust.`,
            buttonText: "Get SEO Copywriting",
            buttonLink: "/contact-us",
        },

        // 🚀 FINAL CTA Banner
        {
            type: "custom",
            component: "MissionBanner",
            title: "Turn Words into Rankings",
            description: `${COMPANY_NAME} turns your website content into a growth engine — optimised, persuasive, and powerful.`,
            image: "ctaSeoCopy",
        },
    ],
};

export default schema;
