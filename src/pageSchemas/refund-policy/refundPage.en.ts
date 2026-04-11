import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_ADDRESS,
    COMPANY_PHONE,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_EMAIL,
} from "@/resources/constants";

const refundPolicySchema: PageSchema = {
    meta: {
        title: `Refund & Returns Policy – ${COMPANY_NAME}`,
        description:
            `Official Refund & Returns Policy for ${COMPANY_NAME}: tokens, eSIM plans, refunds, and consumer rights.`,
        keywords: [
            "refund policy",
            "returns policy",
            "esim",
            "tokens",
            "refunds",
            "aries sim",
            "digital services",
        ],
        canonical: "/refund-policy",
        ogImage: {
            title: `${COMPANY_NAME} – Refund Policy`,
            description:
                `Transparent refund policy for ${COMPANY_NAME} digital eSIM services.`,
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Refund & Returns Policy",
            description:
                `Effective date: 7 April 2026\n\nThis Refund & Returns Policy applies to the digital services offered through Aries Sim at https://www.ariessim.co.uk and is issued by:\n${COMPANY_LEGAL_NAME}\nCompany Number: ${COMPANY_NUMBER}\nAddress: ${COMPANY_ADDRESS}\nEmail: ${COMPANY_EMAIL}\nPhone: ${COMPANY_PHONE}\n\nAries Sim provides digital eSIM services only. No physical goods are sold or shipped. As a result, this Policy governs refunds only. It does not create any right to return physical products.\n\nThis Policy should be read together with our Terms and Conditions.\n\nNothing in this Policy limits any mandatory rights you may have under the laws of England and Wales or under other applicable consumer protection law.`,
        },
        {
            type: "text",
            title: "1. Summary",
            bullets: [
                "1.1 Refund requests are assessed in accordance with this Policy, our Terms and Conditions, and applicable law.",
                "1.2 Refunds, where approved, are usually processed within 5 to 10 business days after approval. The time for funds to appear may vary depending on your payment provider.",
                "1.3 Refunds will not exceed the amount originally paid by you for the relevant transaction.",
                "1.4 Tokens already used to obtain an eSIM Plan or other paid digital service are generally non-refundable, except where required by law or where we fail to provide the purchased service as described.",
                "1.5 Delivered eSIM Plans are generally non-refundable once supply has begun, except where required by law or where the relevant service is materially defective, not delivered, or materially not as described.",
                "1.6 Tokens are account-bound, non-transferable, and cannot be exchanged for cash except where required by law or expressly stated by us.",
                "1.7 Promotional or bonus Tokens are non-refundable, unless the relevant promotion expressly states otherwise.",
                "1.8 If you expressly request immediate supply of digital content or digital services and acknowledge the loss of your withdrawal right where applicable, your statutory right to withdraw may end once supply begins.",
                `1.9 Refund requests must be sent to ${COMPANY_EMAIL} with sufficient details to allow us to review the matter.`,
            ],
        },
        {
            type: "text",
            title: "2. Scope",
            bullets: [
                "2.1 This Policy applies to:",
                "(a) purchases of Tokens;",
                "(b) purchases or redemptions of eSIM Plans; and",
                "(c) refund requests relating to digital connectivity services delivered through Aries Sim.",
                "2.2 This Policy applies to country, regional, and global eSIM Plans made available through the Service.",
                "2.3 This Policy does not apply to third-party products or services purchased outside Aries Sim, even if linked from our website.",
            ],
        },
        {
            type: "text",
            title: "3. Definitions",
            description: "For the purposes of this Policy:",
            bullets: [
                "Tokens means internal digital credits used solely within Aries Sim to obtain eSIM Plans and related paid services.",
                "Unused Tokens means Tokens credited to your Account that have not been redeemed, spent, or consumed.",
                "Used Tokens means Tokens that have been redeemed for an eSIM Plan or other paid digital service, or where performance of the relevant service has already begun.",
                "eSIM Plan means any digital mobile connectivity package made available through the Service.",
                "Delivered eSIM Plan means an eSIM Plan for which the QR code, activation code, installation details, or other digital access credentials have been sent to you.",
                "Promotional or Bonus Tokens means Tokens granted free of charge or as part of a promotion.",
            ],
        },
        {
            type: "text",
            title: "4. General Refund Principles",
            bullets: [
                "4.1 Refund limit. Any refund will be limited to the amount actually paid by you for the relevant transaction.",
                "4.2 Used Tokens are generally non-refundable, except:",
                "(a) where required by applicable law;",
                "(b) where we fail to provide the purchased service;",
                "(c) where the delivered eSIM Plan is materially defective; or",
                "(d) where the delivered eSIM Plan is materially not as described.",
                "4.3 Unused Tokens may be eligible for refund if requested before use.",
                "4.4 Tokens are account-bound and non-transferable.",
                "4.5 Tokens are not redeemable for cash except where required by law.",
                "4.6 Promotional Tokens are non-refundable.",
                "4.7 Immediate digital supply may remove withdrawal rights.",
                "4.8 Supply begins once eSIM or activation data is delivered.",
            ],
        },
        {
            type: "text",
            title: "5. When Refunds May Be Approved",
            bullets: [
                "5.1 Tokens not credited due to technical error.",
                "5.2 eSIM not delivered due to system failure.",
                "5.3 eSIM defective or unusable.",
                "5.4 Service materially different from description.",
                "5.5 Duplicate payment.",
                "5.6 Incorrect Token deduction.",
                "5.7 Refund required by law.",
            ],
        },
        {
            type: "text",
            title: "6. When Refunds Will Normally Not Be Approved",
            bullets: [
                "6.1 Tokens already used.",
                "6.2 eSIM already delivered or used.",
                "6.3 Change of mind after delivery.",
                "6.4 Wrong plan purchased.",
                "6.5 Device incompatibility.",
                "6.6 Travel plans changed.",
                "6.7 Wrong activation usage.",
                "6.8 User deleted eSIM.",
                "6.9 User-side technical issues.",
                "6.10 Personal dissatisfaction.",
                "6.11 Network limitations.",
                "6.12 Carrier charges due to user settings.",
                "6.13 Promotional Tokens.",
                "6.14 Fraud or abuse suspected.",
            ],
        },
        {
            type: "text",
            title: "7. How to Request a Refund",
            bullets: [
                `7.1 Contact ${COMPANY_EMAIL}.`,
                "7.2 Provide:",
                "(a) account email;",
                "(b) order reference;",
                "(c) purchase date;",
                "(d) issue type;",
                "(e) description;",
                "(f) evidence.",
                "7.3 Additional information may be requested.",
            ],
        },
        {
            type: "text",
            title: "8. Review Procedure and Decisions",
            bullets: [
                "8.1 Requests reviewed within reasonable time.",
                "8.2 We may review logs, payments, delivery, and support data.",
                "8.3 Refunds issued to original payment method.",
                "8.4 Alternatives:",
                "(a) re-delivery;",
                "(b) fix;",
                "(c) replacement;",
                "(d) token restore.",
                "8.5 Rejection may include explanation.",
            ],
        },
        {
            type: "text",
            title: "9. Chargebacks, Fraud, and Abuse",
            bullets: [
                "9.1 Chargebacks pause review.",
                "9.2 Evidence may be submitted.",
                "9.3 Accounts may be suspended for abuse.",
            ],
        },
        {
            type: "text",
            title: "10. Processing Time",
            bullets: [
                "10.1 5–10 business days processing.",
                "10.2 Bank timing may vary.",
                "10.3 Not responsible for banking delays.",
            ],
        },
        {
            type: "text",
            title: "11. Changes to This Policy",
            bullets: [
                "11.1 Policy may be updated.",
                "11.2 Latest version published.",
                "11.3 Changes apply prospectively.",
            ],
        },
        {
            type: "text",
            title: "12. Governing Law and Consumer Rights",
            bullets: [
                "12.1 Governed by England and Wales law.",
                "12.2 Consumer rights preserved.",
                "12.3 International consumer protections may apply.",
            ],
        },
        {
            type: "text",
            title: "13. Contact Details",
            bullets: [
                COMPANY_LEGAL_NAME || "",
                `Company Number: ${COMPANY_NUMBER}`,
                `Address: ${COMPANY_ADDRESS}`,
                `Email: ${COMPANY_EMAIL}`,
                `Phone: ${COMPANY_PHONE}`,
            ],
        },
    ],
};

export default refundPolicySchema;