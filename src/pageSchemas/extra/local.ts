import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `Local SEO — ${COMPANY_NAME}`,
        description: `Get more local customers with ${COMPANY_NAME}: improve your Google Maps visibility, local citations, and reputation to dominate local search.`,
        keywords: [
            "local SEO",
            "Google Maps optimisation",
            "local business ranking",
            "GMB optimisation",
            "local citations",
            "reviews management",
        ],
        canonical: "/cases/local-seo",
    },

    blocks: [
        // 🏁 HERO
        {
            type: "custom",
            component: "HeroSection",
            title: "Local SEO Optimisation",
            highlight: "Be Found Where It Matters",
            description: `${COMPANY_NAME} helps local businesses appear higher in Google Maps and nearby searches.  
We optimise your Google Business Profile, build local citations, and boost reputation to attract customers near you.`,
            image: "image8",
            align: "right",
            primaryCta: { text: "Improve Local Visibility", link: "/contact-us?service=Local%20SEO%20Optimisation&tokens=30" },
        },

        // 💡 INTRO
        {
            type: "custom",
            component: "InfoBlock",
            title: "Why Local SEO Is Vital",
            description: `80% of customers look for local services online — if your business doesn’t appear in top results, your competitors get those leads.  
We make sure your brand is visible, trusted, and chosen locally.`,
            bullets: [
                "Optimised Google Business Profile",
                "Consistent NAP citations",
                "Positive review management",
                "Local keyword targeting",
            ],
            align: "center",
        },

        // 🧭 PROCESS
        {
            type: "custom",
            component: "Timeline",
            title: "How We Improve Your Local Rankings",
            steps: [
                {
                    title: "1. Local Audit",
                    description:
                        "We check your presence in Google Maps, directories, and analyse your competitors’ local performance.",
                },
                {
                    title: "2. Google Business Optimisation",
                    description:
                        "We refine your GBP data — categories, keywords, posts, and visuals for better ranking and engagement.",
                },
                {
                    title: "3. Citations & Local Links",
                    description:
                        "We build consistent business mentions across trusted local directories and partner websites.",
                },
                {
                    title: "4. Reviews & Reputation Management",
                    description:
                        "We help collect and respond to customer reviews to build trust and attract new visitors.",
                },
                {
                    title: "5. Reporting & Ongoing Tracking",
                    description:
                        "Monthly updates show ranking progress, calls, and traffic improvements.",
                },
            ],
        },

        // 📊 RESULTS
        {
            type: "custom",
            component: "ValuesIcons",
            title: "What You’ll Gain from Local SEO",
            description: "Increase local traffic, calls, and foot visits through stronger map visibility.",
            values: [
                { icon: "📍", title: "Top Google Maps Rankings", text: "Appear in the top 3 local results for your niche." },
                { icon: "☎️", title: "More Calls & Visits", text: "Turn online searches into real-world customers." },
                { icon: "⭐", title: "Better Reputation", text: "Manage reviews and showcase customer satisfaction." },
                { icon: "🏆", title: "Local Authority", text: "Be the go-to business in your area." },
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
            title: "Real Local Success Stories",
            description: "See how local SEO transformed businesses in their cities.",
            testimonials: [
                {
                    name: "Marta L.",
                    role: "Owner, Beauty Salon",
                    image: "review3",
                    text: "We jumped into the top 3 map pack within 2 months — calls doubled and appointments filled up!",
                    rating: 5,
                },
                {
                    name: "Andriy N.",
                    role: "Founder, Car Service",
                    image: "review5",
                    text: "They rebuilt our local citations and optimised Google profile — we’re finally visible to local clients.",
                    rating: 5,
                },
            ],
        },

        // 📩 CTA
        {
            type: "custom",
            component: "TextWithButton",
            title: "Ready to Dominate Local Search?",
            description: `Let ${COMPANY_NAME} put your business on the map — literally.`,
            buttonText: "Start Local SEO",
            buttonLink: "/contact-us",
        },

        // 🚀 FINAL BANNER
        {
            type: "custom",
            component: "MissionBanner",
            title: "Attract Local Clients with Strong SEO",
            description: `${COMPANY_NAME} ensures your business appears where people search — locally.`,
            image: "ctaLocalSeo",
        },
    ],
};

export default schema;
