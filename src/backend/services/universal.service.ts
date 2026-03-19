import { connectDB } from "../config/db";
import { UniversalOrder, UniversalOrderDocument } from "../models/universalOrder.model";
import { User } from "../models/user.model";
import { transactionService } from "../services/transaction.service";
import OpenAI from "openai";
import { ENV } from "../config/env";
import mongoose from "mongoose";
import { emailService } from "@/backend/services/email.service";

const openai = new OpenAI({ apiKey: ENV.OPENAI_API_KEY });

function buildPrompt(body: any): string {
    const { category, fields, planType } = body;
    const jsonData = JSON.stringify(fields, null, 2);
    const languageNote = body.language
        ? `Write the entire output in ${body.language}.`
        : "Write in English.";

    switch (category) {
        case "training":
            return planType === "reviewed"
                ? `
You are a certified human performance coach.
Design a **comprehensive and highly detailed ${fields.days || 7}-day training plan**.

## Client Data
${jsonData}

## Instructions:
- Write in clear, structured language, sectioned by day.
- Include warm-ups, exercises, rest, motivation, and explanations.
- Tone: professional and encouraging.
- ${languageNote}
`
                : `
You are a virtual fitness assistant.
Generate a **concise ${fields.days || 7}-day workout plan**.

Client info:
${jsonData}

Focus on: Day, Focus, Exercises, Tip.
Tone: energetic and friendly.
${languageNote}
`;

        case "business":
            return planType === "reviewed"
                ? `
You are a senior business strategist and VC advisor.
Create a **comprehensive, investor-ready business plan** based on the data below.

## Company Data
${jsonData}

## Deliverables
- Executive Summary
- Problem & Solution
- Product/Service
- Market Overview (TAM/SAM/SOM), ICP
- Competitive Landscape & Differentiation
- Go-To-Market & Sales
- Business Model & Unit Economics
- Operations & Team
- 12–36 month Roadmap & Milestones
- Risks & Mitigations
- Financial Overview (high level P&L + key metrics)
- Clear next steps / asks

Style: crisp, structured, with headings, tables where helpful.
${languageNote}
`
                : `
You are a business planning assistant.
Generate a **concise business plan outline** using the inputs below.

Inputs:
${jsonData}

Include: Summary, Problem/Solution, Market, Product, GTM, Business Model, Team, Milestones.
Keep it skimmable with bullet points.
${languageNote}
`;

        case "nutrition":
            return planType === "reviewed"
                ? `
You are a certified nutritionist.
Create a **detailed daily meal plan** with calories, macros, and hydration.

User info:
${jsonData}

Include explanations and adaptation tips.
${languageNote}
`
                : `
You are an AI diet assistant.
Generate a short nutrition overview for:
${jsonData}
Include daily focus, example meals, and hydration note.
${languageNote}
`;

        default:
            return planType === "reviewed"
                ? `
You are a senior content creator.
Produce a **comprehensive, structured response** with expert depth.

Context:
${jsonData}
${languageNote}
`
                : `
You are an AI assistant.
Generate a **concise version** of the requested content:
${jsonData}
${languageNote}
`;
    }
}

/** 🧩 Extra section prompt builder */
function buildExtraPrompt(extra: string, category: string, fields: any, language?: string): string {
    const context = JSON.stringify(fields, null, 2);
    const langNote = language ? `Write in ${language}.` : "";

    // training defaults preserved; add business extras
    switch (extra) {
        // generic keys kept for backward-compatibility
        case "progressTracking":
            return `Create a weekly progress tracking table for ${category}.\n${langNote}\n${context}`;
        case "motivationTips":
            return `Write 10 motivational phrases related to this ${category} context.\n${langNote}\n${context}`;
        case "summaryReport":
            return `Write a short summary report showing how the plan achieves goals.\n${langNote}\n${context}`;

        // business-specific extras
        case "marketingStrategy":
            return `Create a structured Marketing Strategy (ICP, positioning, channels, messaging, KPIs) for this business.\n${langNote}\n${context}`;
        case "financialProjection":
            return `Produce a 3-year financial projection (revenue, COGS, gross margin, OpEx buckets, EBITDA) with key assumptions and unit economics. Use markdown tables.\n${langNote}\n${context}`;
        case "riskAnalysis":
            return `List top risks across Market, Product, Team, Finance, Legal and propose mitigations. Prioritize by impact x probability. Use a table.\n${langNote}\n${context}`;
        case "growthRoadmap":
            return `Draft a 12–24 month growth roadmap with milestones by quarter, owners, and success metrics.\n${langNote}\n${context}`;
        case "competitorReview":
            return `Create a competitor analysis matrix (competitors, features/pricing, strengths/weaknesses, our edge). Use a comparison table.\n${langNote}\n${context}`;
        case "pitchDeck":
            return `Outline a 12–15 slide investor pitch deck with slide titles and bullet points tailored to this business.\n${langNote}\n${context}`;
        case "brandingGuide":
            return `Write a lightweight branding & visual identity brief (voice & tone, value pillars, color/typography suggestions, logo usage ideas) suited to the target audience.\n${langNote}\n${context}`;
        case "teamStructure":
            return `Propose an organizational structure with key roles, responsibilities (RACI hints), and near-term hires with priorities.\n${langNote}\n${context}`;
        case "customerJourney":
            return `Map a customer journey (Awareness → Consideration → Purchase → Onboarding → Retention → Advocacy) with key touchpoints and metrics.\n${langNote}\n${context}`;
        case "salesForecast":
            return `Build a simple sales forecast table (quarters, leads, conversion rates, ACV/ARPU, bookings/revenue) with assumptions.\n${langNote}\n${context}`;
        case "fundingPlan":
            return `Draft a funding strategy (target round size, use of proceeds, milestones to next round, suggested investor profile) tailored to this business.\n${langNote}\n${context}`;

        default:
            return `Generate a useful "${extra}" section for the ${category} context.\n${langNote}\n${context}`;
    }
}

export const universalService = {
    /** create order */
    async createOrder(userId: string, email: string, body: any) {
        await connectDB();

        if (!body || typeof body !== "object") throw new Error("Invalid request body");
        if (!body.category) throw new Error("Missing category");
        if (!body.fields || typeof body.fields !== "object") throw new Error("Missing fields");
        if (!body.totalTokens || isNaN(body.totalTokens)) throw new Error("Invalid totalTokens value");

        if (body.planType === "instant") body.planType = "default";
        if (!["default", "reviewed"].includes(body.planType))
            throw new Error("Invalid planType (must be 'default' or 'reviewed')");

        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        const languageCost = body.language && body.language !== "English" ? 5 : 0;
        const totalCost = Number(body.totalTokens) + languageCost;

        if (user.tokens < totalCost)
            throw new Error(`Insufficient tokens (have ${user.tokens}, need ${totalCost})`);

        // charge
        user.tokens -= totalCost;
        await user.save();
        await transactionService.record(user._id, email, totalCost, "spend", user.tokens);

        // main generation
        const mainPrompt = buildPrompt(body);
        let mainText = "";
        try {
            const mainRes = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are a structured professional generator. Always output final readable content.",
                    },
                    { role: "user", content: mainPrompt },
                ],
            });
            mainText = mainRes.choices?.[0]?.message?.content?.trim() || "";
        } catch (err: any) {
            throw new Error("AI generation failed, please retry later");
        }

        // extras generation
        const extrasData: Record<string, string> = {};
        if (Array.isArray(body.extras) && body.extras.length > 0) {
            for (const extra of body.extras) {
                try {
                    const extraPrompt = buildExtraPrompt(extra, body.category, body.fields, body.language);
                    const extraRes = await openai.chat.completions.create({
                        model: "gpt-4o-mini",
                        messages: [{ role: "user", content: extraPrompt }],
                    });
                    extrasData[extra] = extraRes.choices?.[0]?.message?.content?.trim() || "";
                } catch {}
            }
        }

        const readyAt =
            body.planType === "reviewed" ? new Date(Date.now() + 24 * 60 * 60 * 1000) : new Date();

        const orderDoc = {
            userId: new mongoose.Types.ObjectId(userId),
            email,
            category: body.category,
            fields: body.fields,
            planType: body.planType,
            extras: body.extras || [],
            totalTokens: Number(body.totalTokens) + (languageCost || 0),
            language: body.language || "English",
            response: mainText,
            extrasData,
            status: body.planType === "reviewed" ? "pending" : "ready",
            readyAt,
        };

        const order = await UniversalOrder.create(orderDoc);

        emailService.sendOrderConfirmationEmail({
            email: user.email,
            firstName: user.firstName,
            subject: "Order confirmed",
            summary: "Your order was completed successfully.",
            items: [
                `Category: ${body.category}`,
                `Plan: ${body.planType}`,
                ...(body.extras?.length ? [`Extras: ${body.extras.join(", ")}`] : []),
            ],
            amountLabel: "Tokens used",
            amountValue: `${totalCost} tokens`,
            transactionDate: order.createdAt,
        }).catch((error) => {
            console.error("❌ Universal order confirmation email failed:", error);
        });

        return order.toObject({ flattenMaps: true });
    },

    async getOrders(userId: string) {
        await connectDB();
        const docs = await UniversalOrder.find({ userId })
            .sort({ createdAt: -1 })
            .lean<UniversalOrderDocument[]>({ virtuals: true });

        return docs.map((d: any) => {
            if (d.extrasData instanceof Map) d.extrasData = Object.fromEntries(d.extrasData);
            return d;
        });
    },

    async getOrderById(userId: string, orderId: string) {
        await connectDB();
        const doc = await UniversalOrder.findOne({ _id: orderId, userId }).lean<UniversalOrderDocument>({ virtuals: true });
        if (!doc) return null;
        if (doc.extrasData instanceof Map) (doc as any).extrasData = Object.fromEntries(doc.extrasData);
        return doc;
    },
};
