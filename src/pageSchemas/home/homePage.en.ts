import {PageSchema} from "@/components/constructor/page-render/types";
import {COMPANY_NAME} from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `${COMPANY_NAME} — SEO Optimisation & Website Promotion Services`,
        description: `Full-cycle SEO optimisation for your website: technical audits, keyword research, on-page and off-page optimisation, content marketing and local SEO.`,
        keywords: [
            "SEO optimisation",
            "technical audit",
            "Google ranking",
            "on-page SEO",
            "link building",
            "content marketing",
            "local SEO",
            "SEO agency Ukraine",
        ],
        canonical: "/seo",
    },

    blocks: [
        // 🏁 HERO
        {
            type: "custom",
            component: "HeroSection",
            title: "Rank Higher. Grow Faster. Win Organic Traffic.",
            highlight: "AI-Powered SEO by Experts — Pay Once, Grow Forever",
            description:
                `${COMPANY_NAME} is your all-in-one SEO platform. We audit, optimise, and promote your website — using AI tools and human expertise. Get measurable growth and pay with flexible tokens.`,
            primaryCta: {text: "Start SEO Audit", link: "/pricing"},
            image: "image2",
            showTrustBadge: true,
        },

        // 🌍 Highlight logos
        {
            type: "custom",
            component: "Marquee",
            items: [
                {text: "Trusted by 200+ Businesses Worldwide"},
                {text: "Serving Clients in 15+ Countries"},
                {text: "Proven SEO Strategies for Diverse Industries"},
                {text: "Helping Startups to Enterprises Grow Organically"},
            ],
        },

        // 💡 Section — intro
        {
            type: "custom",
            component: "TextWithButton",
            title: "SEO That Works — Not Just Promises",
            buttonText: "Get a Free Consultation",
            buttonLink: "/contact",
        },

        // 🧩 Services overview
        {
            type: "grid",
            columns: 2,
            gap: "2rem",
            cards: [
                {
                    image: "image1",
                    title: "🔍 Technical Website Audit",
                    description:
                        "Identify issues that block ranking: speed, Core Web Vitals, duplicate pages, crawling and indexing. You’ll receive a full report with priorities and fixes.",
                    buttonText: "Request Audit",
                    buttonLink: "/pricing",
                },
                {
                    image: "image3",
                    title: "✍️ On-Page SEO",
                    description:
                        "We optimise content, tags, structure, and visuals. Clean HTML, powerful titles, proper hierarchy — all aligned with your keywords and intent.",
                    buttonText: "Improve My Pages",
                    buttonLink: "/contact",
                },
                {
                    image: "image4",
                    title: "🌐 Off-Page SEO",
                    description:
                        "Backlinks that actually work. Guest posts, outreach, PR placements, and crowd-marketing that build long-term authority.",
                    buttonText: "See Link Packages",
                    buttonLink: "/pricing",
                },
                {
                    image: "image5",
                    title: "📱 Local SEO",
                    description:
                        "Appear in Google Maps, increase reviews, and own your city’s search results.",
                    buttonText: "Optimise for My Area",
                    buttonLink: "/contact",
                },
                {
                    image: "image7",
                    title: "🧾 SEO Copywriting",
                    description:
                        "Get unique, engaging SEO texts and articles that attract visitors and satisfy algorithms. We write for both people and bots.",
                    buttonText: "View Content Samples",
                    buttonLink: "#cases",
                },
                {
                    image: "image6",
                    title: "📊 Competitor Analysis",
                    description:
                        "We study your niche, keywords, and backlinks to uncover what competitors do better — and help you outrank them.",
                    buttonText: "Order Research",
                    buttonLink: "/pricing",
                },
            ],
        },

        // 🪜 SEO workflow timeline
        {
            type: "custom",
            component: "Timeline",
            title: "Step-by-Step SEO Growth Plan",
            steps: [
                {title: "1. Technical Audit", description: "We check structure, indexing, and performance."},
                {title: "2. Keyword Mapping", description: "We select relevant, profitable search terms."},
                {title: "3. On-Page Fixes", description: "Optimisation of content, speed, and metadata."},
                {title: "4. Link Building", description: "We grow authority through safe backlinks."},
                {title: "5. Reporting", description: "Track rankings, traffic, and ROI transparently."},
            ],
        },

        // 💎 Why choose us
        {
            type: "custom",
            component: "ValuesIcons",
            title: "Why Choose Our SEO Agency",
            description:
                "We combine AI technology with human creativity to bring measurable, lasting results. Every client has a custom SEO roadmap.",
            values: [
                {icon: "📈", title: "Proven Growth", text: "100+ projects with guaranteed traffic increase."},
                {icon: "🤖", title: "AI-Enhanced", text: "Automated analysis & keyword clustering tools."},
                {icon: "🕵️", title: "Competitor Insights", text: "We track and outsmart your top rivals."},
                {icon: "🧩", title: "All-in-One", text: "Audit, content, backlinks — everything in one place."},
            ],
        },

        {
            type: "section",
            title: "Our Portfolio",
            description: "Explore how our SEO expertise helped diverse brands grow their visibility, traffic, and conversions.",
            left: {
                type: "grid",
                columns: 3,
                gap: "1.2rem",
                items: [
                    {
                        key: "1",
                        block: {
                            type: "media",
                            mediaType: "image",
                            src: "portfolio1",
                            hoverEnabled: true,
                            hoverText: "E-Commerce Fashion Store — On-Page SEO: +120% organic sales in 4 months",
                            hoverButton: { text: "See Case", link: "/cases/electronics-backlinks" },                        },
                    },
                    {
                        key: "2",
                        block: {
                            type: "media",
                            mediaType: "image",
                            src: "portfolio2",
                            hoverEnabled: true,
                            hoverText: "Dental Clinic Network — Local SEO: +230% visibility on Google Maps",
                            hoverButton: { text: "See Case", link: "/cases/electronics-backlinks" },                        },
                    },
                    {
                        key: "3",
                        block: {
                            type: "media",
                            mediaType: "image",
                            src: "portfolio3",
                            hoverEnabled: true,
                            hoverText: "SaaS Analytics Platform — Technical SEO Audit: +75% faster load time",
                            hoverButton: { text: "See Case", link: "/cases/electronics-backlinks" },                        },
                    },
                    {
                        key: "4",
                        block: {
                            type: "media",
                            mediaType: "image",
                            src: "portfolio4",
                            hoverEnabled: true,
                            hoverText: "Restaurant Chain — SEO Copywriting: +90% engagement on location pages",
                            hoverButton: { text: "See Case", link: "/cases/electronics-backlinks" },                        },
                    },
                    {
                        key: "5",
                        block: {
                            type: "media",
                            mediaType: "image",
                            src: "portfolio5",
                            hoverEnabled: true,
                            hoverText: "Real Estate Agency — Competitor Analysis: outranked 4 top rivals in 6 months",
                            hoverButton: { text: "See Case", link: "/cases/electronics-backlinks" },                        },
                    },
                    {
                        key: "6",
                        block: {
                            type: "media",
                            mediaType: "image",
                            src: "portfolio6",
                            hoverEnabled: true,
                            hoverText: "Online Electronics Store — Off-Page SEO: +180 backlinks & +70 domain authority",
                            hoverButton: { text: "See Case", link: "/cases/electronics-backlinks" },
                        },
                    },
                ],
            },
        },

        // 👥 Team section
        {
            type: "custom",
            component: "TeamGrid",
            title: "Meet the Team Behind the Rankings",
            description:
                "A multidisciplinary team of SEO specialists, analysts, copywriters, and digital strategists — united by one goal: your growth.",
            members: [
                {
                    name: "Olena V.",
                    role: "Head of SEO",
                    bio: "11 years of experience, ex-agency director, passionate about technical SEO and team growth.",
                    image: "team7",
                },
                {
                    name: "Max D.",
                    role: "SEO Engineer",
                    bio: "Focuses on Core Web Vitals, indexing, and site performance optimisation.",
                    image: "team5",
                },
                {
                    name: "Daria L.",
                    role: "Content Strategist",
                    bio: "Transforms analytics into content plans that engage and convert readers into clients.",
                    image: "team6",
                },
                {
                    name: "Ihor P.",
                    role: "Link Building Manager",
                    bio: "Builds high-quality backlinks through authentic outreach and strategic partnerships.",
                    image: "team4",
                },
                {
                    name: "Svitlana K.",
                    role: "SEO Analyst",
                    bio: "Masters keyword research, competitor insights, and data-driven SEO reporting.",
                    image: "team3",
                },
                {
                    name: "Andrii M.",
                    role: "UX & Conversion Specialist",
                    bio: "Optimises user experience and landing flows to boost conversions and dwell time.",
                    image: "team2",
                },
            ],
        },


        // 💬 Testimonials
        {
            type: "custom",
            component: "TestimonialsSlider",
            title: "What Our Clients Say",
            description: "Real feedback from companies we’ve helped grow organically.",
            testimonials: [
                {
                    name: "Anastasia Romanova",
                    role: "CMO, Local Clinic",
                    image: "review6",
                    text: "The local SEO campaign doubled our calls in just two months. The analytics dashboard is pure gold — everything is transparent and easy to track.",
                    rating: 5,
                },
                {
                    name: "Viktor Kovalenko",
                    role: "Founder, Tech Startup",
                    image: "review5",
                    text: "I love the token-based model — simple, flexible, and cost-effective. We scaled traffic by 3x without unpredictable retainers.",
                    rating: 5,
                },
                {
                    name: "Oleksandr Hryn",
                    role: "Marketing Director, Retail Brand",
                    image: "review4",
                    text: "Professional, responsive, and strategic. Their off-page SEO helped us dominate Google rankings in our niche within 6 months.",
                    rating: 5,
                },
                {
                    name: "Maria Koval",
                    role: "E-commerce Manager",
                    image: "review3",
                    text: "After their audit and on-page optimisation, our organic sales skyrocketed. They also improved UX — now our bounce rate is down 35%.",
                    rating: 5,
                },
                {
                    name: "Andrii Poltavets",
                    role: "CEO, Logistics Company",
                    image: "review2",
                    text: "Their team understood our complex B2B structure and delivered results fast. Real professionals who think like business partners.",
                    rating: 5,
                },
            ],
        },


        // 💰 Token pricing
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

        // ❓ FAQ
        {
            type: "faq",
            items: [
                {
                    question: "How long does it take to see SEO results?",
                    answer:
                        "Most clients notice ranking improvements within 4–8 weeks, depending on competition and domain authority.",
                },
                {
                    question: "Do you use AI in optimisation?",
                    answer:
                        "Yes, we combine human expertise with AI tools for faster keyword research, clustering, and performance tracking.",
                },
                {
                    question: "Can I buy tokens once and use them later?",
                    answer:
                        "Absolutely. Tokens don’t expire — spend them for any SEO service, from audits to backlinks.",
                },
                {
                    question: "Is the work 100% white-hat?",
                    answer:
                        "Yes. We strictly follow Google guidelines to ensure long-term stability and avoid penalties.",
                },
            ],
        },

        // 🎯 Final CTA
        {
            type: "custom",
            component: "MissionBanner",
            title: "Ready to Boost Your Organic Traffic?",
            description:
                "Get a free consultation and see how our SEO services can transform your online presence.",
            image: "image9",

        },
    ],
};

export default schema;
