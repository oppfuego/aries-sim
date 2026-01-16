"use client";

import {pdf} from "@react-pdf/renderer";
import {
    ClassicCV,
    CreativeCV,
    ModernCV,
    ManagerReviewedCV,
} from "@/components/extra/cv/cvTemplates/cvTemplates";
import {CVOrderType} from "@/backend/types/cv.types";

// 🔹 універсальний рендер extras (використовується всередині шаблонів)
const renderExtras = (o: CVOrderType) => {
    if (!o.extrasData || Object.keys(o.extrasData).length === 0) return null;

    const titleMap: Record<string, string> = {
        coverLetter: "Cover Letter",
        linkedin: "LinkedIn Summary",
        keywords: "Keyword Optimization",
        atsCheck: "ATS Compatibility Report",
        jobAdaptation: "Adapted CV for Job Description",
        achievements: "Achievements Booster",
        skillsGap: "Skills Gap Analysis",
    };

    return Object.entries(o.extrasData).map(([key, value]) => ({
        title: titleMap[key] || key,
        content: value,
    }));
};

// 🧾 Головна функція завантаження PDF
export async function downloadCVPDF(order: CVOrderType) {
    console.log("🧾 [downloadCVPDF] Start for:", order.fullName);
    console.log("📝 Response preview:", order.response?.slice(0, 200));
    console.log("🗂️ Extras data:", order.extrasData);
    let doc;

    if (!order.fontStyle || order.fontStyle === "Default") {
        order.fontStyle = "Helvetica";
    }

    if (order.reviewType === "manager") {
        doc = ManagerReviewedCV(order);
    }
    // Інакше звичайні стилі
    else {
        switch (order.cvStyle) {
            case "Modern":
                doc = ModernCV(order);
                break;
            case "Creative":
                doc = CreativeCV(order);
                break;
            default:
                doc = ClassicCV(order);
        }
    }

    // 🟩 Генерація PDF
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cv-${order.cvStyle.toLowerCase()}-${order._id}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
}
