import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME, COMPANY_EMAIL } from "@/resources/constants";

const faqSchema: PageSchema = {
    meta: {
        title: `FAQ — ${COMPANY_NAME} eSIM`,
        description: `Frequently asked questions about ${COMPANY_NAME} eSIM — compatibility, installation, coverage, payments, and support.`,
        keywords: [
            "eSIM FAQ",
            "what is eSIM",
            "how to use eSIM",
            "eSIM installation",
            "international eSIM",
            "travel eSIM questions",
        ],
        canonical: "/faq",
        ogImage: {
            title: `${COMPANY_NAME} eSIM FAQ`,
            description: `Answers to the most common questions about eSIM usage, setup, and mobile data abroad.`,
            bg: "#2C7A7B",
            color: "#ffffff",
        },
    },

    blocks: [

        {
            type: "faq",
            items: [
                {
                    question: `What is ${COMPANY_NAME}?`,
                    answer: `${COMPANY_NAME} is an international eSIM marketplace that lets you buy mobile data plans for travel without physical SIM cards or roaming fees.`,
                },
                {
                    question: "What is an eSIM?",
                    answer:
                        "An eSIM is a digital SIM that allows you to activate a mobile data plan directly on your device without inserting a physical SIM card.",
                },
                {
                    question: "Which devices support eSIM?",
                    answer:
                        "Most modern smartphones support eSIM, including iPhone XS and newer, Google Pixel devices, and many Samsung Galaxy models. Always check your device settings before purchase.",
                },
                {
                    question: "How do I install my eSIM?",
                    answer:
                        "After purchase, you’ll receive a QR code. Simply scan it using your phone’s mobile settings and follow the on-screen instructions to install the eSIM.",
                },
                {
                    question: "When should I activate my eSIM?",
                    answer:
                        "We recommend installing your eSIM before travel and activating mobile data once you arrive at your destination.",
                },
                {
                    question: "Will my eSIM work immediately?",
                    answer:
                        "Yes. Once installed and activated, your eSIM connects automatically to a local network in the destination country.",
                },
                {
                    question: "Can I keep my main SIM active?",
                    answer:
                        "Yes. eSIM works alongside your physical SIM, allowing you to keep your main number for calls and SMS while using eSIM for data.",
                },
                {
                    question: "Are there roaming fees?",
                    answer:
                        "No. All eSIM plans are prepaid with fixed pricing — no roaming charges or hidden fees.",
                },
                {
                    question: "What happens if I run out of data?",
                    answer:
                        "If your data plan expires or runs out, you can easily purchase a new planffected plan or top up directly on our platform.",
                },
                {
                    question: "Do you offer refunds?",
                    answer:
                        "Refunds depend on whether the eSIM has been installed or activated. Please review our Refund Policy or contact support for assistance.",
                },
                {
                    question: "Is my payment information secure?",
                    answer:
                        `${COMPANY_NAME} uses trusted payment providers and secure encryption to protect all transactions.`,
                },
                {
                    question: "How can I contact support?",
                    answer:
                        `You can reach our support team anytime via the contact form or by email at ${COMPANY_EMAIL}. We’re available 24/7.`,
                },
            ],
        },

        // 🎯 CTA
        {
            type: "custom",
            component: "TextWithButton",
            title: "Still Have Questions?",
            description: "Our support team is always ready to help you stay connected.",
            buttonText: "Contact Support",
            buttonLink: "/contact-us",
        },
    ],
};

export default faqSchema;
