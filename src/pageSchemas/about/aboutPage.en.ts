import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `About ${COMPANY_NAME} — Who We Are & How We Grow Brands`,
        description: `${COMPANY_NAME} is an AI-powered SEO agency helping businesses grow through data, strategy, and creativity. Discover our story, milestones, and the results we bring.`,
        keywords: [
            "about seo agency",
            "seo experts",
            "digital marketing team",
            "seo portfolio",
            "seo case studies",
            "ai seo automation",
            "our mission",
        ],
        canonical: "/about",
    },

    blocks: [
        // 🏁 HERO
        {
            type: "custom",
            component: "HeroSection",
            title: "From Small Agency to Global SEO Partner",
            highlight: `${COMPANY_NAME}`,
            description:
                `${COMPANY_NAME} started as a small consultancy focused on transparent SEO.  
Today, we help businesses in 20+ countries increase visibility and sales through AI-enhanced strategies, proven processes, and creative human insight.`,
            image: "image9",
            align: "left",
            showTrustBadge: true,
        },

        // 🧭 TIMELINE — шлях компанії
        {
            type: "custom",
            component: "StoryTimeline",
            steps: [
                {
                    year: "2019",
                    title: "Our Beginning",
                    description:
                        "A team of SEO specialists and data analysts joined forces to fix what agencies ignored — transparency and measurable ROI.",
                },
                {
                    year: "2020",
                    title: "Automation Era",
                    description:
                        "We built internal AI tools for keyword clustering, backlink quality analysis, and rank tracking — saving 60% of manual work.",
                },
                {
                    year: "2021",
                    title: "Global Growth",
                    description:
                        "Our results attracted e-commerce, SaaS, and startups from 10+ countries. We began scaling operations and team expertise.",
                },
                {
                    year: "2023",
                    title: `Launch of ${COMPANY_NAME} Platform`,
                    description:
                        "We introduced token-based pricing and full transparency dashboards — no hidden retainers, just data and growth.",
                },
                {
                    year: "2025",
                    title: "AI-Driven Future",
                    description:
                        "Now, our focus is predictive SEO — using machine learning to forecast traffic and detect ranking trends before competitors.",
                },
            ],
        },

        // 🌍 Highlight strip — короткі факти
        {
            type: "custom",
            component: "HighlightStrip",
            items: [
                { icon: "🚀", text: "Founded in 2019", subtext: "Growing faster every year" },
                { icon: "🌐", text: "20+ Countries", subtext: "Global client base" },
                { icon: "📈", text: "300+ Projects", subtext: "Proven SEO results" },
                { icon: "🤖", text: "AI-Powered Tools", subtext: "Custom analytics & automation" },
            ],
        },

        // 💼 OUR PROJECTS / CASES
        {
            type: "section",
            title: "Case Studies — Real Results, Real Growth",
            description:
                "Every project we take tells a success story. Explore how our strategies boosted visibility, traffic, and sales across industries.",
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
                            src: "portfolio3",
                            hoverEnabled: true,
                            hoverText: "SaaS Analytics Platform — Technical SEO Audit: +75% faster load time",
                            hoverButton: { text: "See Case", link: "/cases/audit" },                        },
                    },
                    {
                        key: "2",
                        block: {
                            type: "media",
                            mediaType: "image",
                            src: "portfolio4",
                            hoverEnabled: true,
                            hoverText: "Restaurant Chain — SEO Copywriting: +90% engagement on location pages",
                            hoverButton: { text: "See Case", link: "/cases/copywriting" },                        },
                    },
                    {
                        key: "3",
                        block: {
                            type: "media",
                            mediaType: "image",
                            src: "portfolio5",
                            hoverEnabled: true,
                            hoverText: "Real Estate Agency — Competitor Analysis: outranked 4 top rivals in 6 months",
                            hoverButton: { text: "See Case", link: "/cases/analysis" },                        },
                    },
                ],
            },
        },

        // 💎 VALUES
        {
            type: "custom",
            component: "ValuesIcons",
            title: "Our Core Values",
            description:
                "These principles guide every project — from keyword research to final results.",
            values: [
                { icon: "🤝", title: "Honesty", text: "No fake reports. Every metric is real and verifiable." },
                { icon: "⚙️", title: "Innovation", text: "We integrate AI tools that improve accuracy and speed." },
                { icon: "📊", title: "Clarity", text: "You always know what’s being done and why it matters." },
                { icon: "💡", title: "Creativity", text: "We blend logic and storytelling for authentic SEO." },
            ],
        },



        // 🧭 PHILOSOPHY BLOCK
        {
            type: "custom",
            component: "InfoBlock",
            title: "Our Philosophy",
            description:
                "We don’t chase algorithms — we understand them. Our mission is to turn SEO into a science of predictable growth powered by human expertise and machine intelligence.",
            align: "center",
        },

        // 👥 TEAM
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

        // 💬 TESTIMONIALS
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

        // ❓ FAQ
        {
            type: "faq",
            items: [
                {
                    question: "What makes your SEO approach unique?",
                    answer:
                        "We merge automation and human strategy — combining AI precision with expert intuition for long-term growth.",
                },
                {
                    question: "Do you work globally?",
                    answer:
                        "Yes. We run multilingual and multi-market SEO campaigns for brands in Europe, the US, and Asia.",
                },
                {
                    question: "Can you showcase real results?",
                    answer:
                        "Absolutely — our portfolio features measurable growth metrics, case studies, and dashboards visible to each client.",
                },
                {
                    question: "Is your process transparent?",
                    answer:
                        "Always. Every report, keyword cluster, and backlink is traceable and shared with the client in real time.",
                },
            ],
        },

        // 🎯 FINAL CTA
        {
            type: "custom",
            component: "MissionBanner",
            title: "Let’s Grow Together",
            description:
                "Join hundreds of brands that trust our team to make their websites visible, competitive, and profitable through data-driven SEO.",
            image: "image10",
        },
    ],
};

export default schema;
