"use client";

import {Document, Page, Text, View, Image, StyleSheet} from "@react-pdf/renderer";
import {CVOrderType} from "@/backend/types/cv.types";

// 🧩 Текстові блоки з перенесенням рядків
const renderParagraphs = (text?: string, style?: any) =>
    text
        ?.split(/\n{1,2}/)
        .filter((t) => t.trim())
        .map((p, i) => (
            <Text key={i} style={style}>
                {p.trim().replace(/\n/g, " ")}
            </Text>
        ));

// 🎨 Динамічний набір тем
const getTheme = (o: CVOrderType) => {
    const primary = o.themeColor && o.themeColor !== "Default" ? o.themeColor : "#2563EB";
    const font = o.fontStyle && o.fontStyle !== "Default" ? o.fontStyle : "Helvetica";
    const accent =
        primary === "#DC2626"
            ? "#FEE2E2"
            : primary === "#059669"
                ? "#D1FAE5"
                : primary === "#7C3AED"
                    ? "#EDE9FE"
                    : primary === "#F59E0B"
                        ? "#FEF3C7"
                        : "#DBEAFE";
    return { primary, accent, font, text: "#111827", bg: "#FFFFFF" };
};

// 🧠 Extras-сторінки (cover letter, LinkedIn і т.д.)
const renderExtrasPages = (o: CVOrderType, theme: ReturnType<typeof getTheme>) => {
    if (!o.extrasData) return null;

    const titles: Record<string, string> = {
        coverLetter: "COVER LETTER",
        linkedin: "LINKEDIN SUMMARY",
        keywords: "KEYWORD OPTIMIZATION",
        atsCheck: "ATS COMPATIBILITY",
        jobAdaptation: "JOB-TAILORED VERSION",
        achievements: "ACHIEVEMENTS BOOST",
        skillsGap: "SKILLS GAP REPORT",
    };

    return Object.entries(o.extrasData).map(([key, raw]) => {
        const title = titles[key] || key;
        const value = String(raw)
            .replace(/\*\*(.*?)\*\*/g, "$1")
            .replace(/```[a-z]*\n?/g, "")
            .replace(/```/g, "");

        return (
            <Page
                key={key}
                size="A4"
                style={{
                    padding: 50,
                    backgroundColor: theme.bg,
                    fontFamily: theme.font,
                    color: theme.text,
                }}
            >
                <View
                    style={{
                        borderBottom: `3pt solid ${theme.primary}`,
                        marginBottom: 16,
                        paddingBottom: 6,
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 18,
                            color: theme.primary,
                            fontWeight: "bold",
                            letterSpacing: 1,
                        }}
                    >
                        {title}
                    </Text>
                </View>
                {renderParagraphs(value, {
                    fontSize: 11,
                    marginBottom: 8,
                    textAlign: "justify",
                    lineHeight: 1.5,
                })}
            </Page>
        );
    });
};

// 🧾 CLASSIC
export const ClassicCV = (o: CVOrderType) => {
    const theme = getTheme(o);
    const s = StyleSheet.create({
        page: {
            padding: 35,
            fontFamily: theme.font,
            color: theme.text,
            backgroundColor: theme.bg,
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 18,
            borderBottom: `2pt solid ${theme.primary}`,
            paddingBottom: 10,
        },
        avatar: {
            width: 75,
            height: 75,
            borderRadius: 38,
            border: `2pt solid ${theme.primary}`,
            marginRight: 18,
        },
        h1: {
            fontSize: 24,
            fontWeight: "bold",
            color: theme.primary,
            marginBottom: 4,
        },
        h2: {
            fontSize: 15,
            color: theme.primary,
            marginTop: 18,
            marginBottom: 8,
            borderBottom: `1.5pt solid ${theme.primary}`,
            paddingBottom: 4,
            textTransform: "uppercase",
        },
        p: {
            fontSize: 12,
            marginBottom: 10,
            textAlign: "justify",
            lineHeight: 1.8,
        },
    });

    return (
        <Document>
            <Page size="A4" style={s.page}>
                {/* Header */}
                <View style={s.header}>
                    {o.photo && <Image src={o.photo} style={s.avatar} />}
                    <View>
                        <Text style={s.h1}>{o.fullName}</Text>
                        <Text style={{ color: theme.text, fontSize: 11 }}>
                            {o.email} • {o.phone}
                        </Text>
                    </View>
                </View>

                {/* Sections */}
                <Text style={s.h2}>Professional Summary</Text>
                {renderParagraphs(o.summary, s.p)}

                <Text style={s.h2}>Experience</Text>
                {renderParagraphs(o.workExperience, s.p)}

                <Text style={s.h2}>Education</Text>
                {renderParagraphs(o.education, s.p)}

                <Text style={s.h2}>Skills</Text>
                {renderParagraphs(o.skills, s.p)}
            </Page>

            {renderExtrasPages(o, theme)}
        </Document>
    );
};
//
// 💼 MODERN
//
export const ModernCV = (o: CVOrderType) => {
    const theme = getTheme(o);
    const s = StyleSheet.create({
        page: {
            padding: 30,
            backgroundColor: theme.bg,
            fontFamily: theme.font,
            color: theme.text,
        },
        left: {
            width: "28%",
            backgroundColor: theme.accent,
            padding: 16,
            borderRadius: 10,
        },
        right: { width: "72%", paddingLeft: 25 },
        avatar: {
            width: 95,
            height: 95,
            borderRadius: 48,
            marginBottom: 18,
            border: `3pt solid ${theme.primary}`,
            alignSelf: "center",
        },
        chip: {
            backgroundColor: theme.primary,
            color: "white",
            fontSize: 10,
            padding: 5,
            borderRadius: 4,
            textAlign: "center",
            marginBottom: 12,
        },
        h1: {
            fontSize: 22,
            fontWeight: "bold",
            color: theme.primary,
            marginBottom: 8,
        },
        h2: {
            fontSize: 15,
            marginTop: 18,
            marginBottom: 8,
            color: theme.primary,
            borderBottom: `1.5pt solid ${theme.primary}`,
            paddingBottom: 4,
            textTransform: "uppercase",
        },
        p: {
            fontSize: 12,
            marginBottom: 10,
            textAlign: "justify",
            lineHeight: 1.8,
        },
    });

    return (
        <Document>
            <Page size="A4" style={s.page}>
                <View style={{ flexDirection: "row" }}>
                    <View style={s.left}>
                        {o.photo && <Image src={o.photo} style={s.avatar} />}
                        <Text style={s.chip}>
                            {o.industry} • {o.experienceLevel}
                        </Text>
                        <Text style={{ fontSize: 10.5, marginBottom: 4 }}>{o.email}</Text>
                        <Text style={{ fontSize: 10.5, marginBottom: 10 }}>{o.phone}</Text>
                        <Text style={s.h2}>Skills</Text>
                        {renderParagraphs(o.skills, s.p)}
                    </View>

                    <View style={s.right}>
                        <Text style={s.h1}>{o.fullName}</Text>
                        <Text style={s.h2}>Summary</Text>
                        {renderParagraphs(o.summary, s.p)}
                        <Text style={s.h2}>Experience</Text>
                        {renderParagraphs(o.workExperience, s.p)}
                        <Text style={s.h2}>Education</Text>
                        {renderParagraphs(o.education, s.p)}
                    </View>
                </View>
            </Page>
            {renderExtrasPages(o, theme)}
        </Document>
    );
};
//
// 🎨 CREATIVE
//
export const CreativeCV = (o: CVOrderType) => {
    const theme = getTheme(o);
    const s = StyleSheet.create({
        page: {
            fontFamily: theme.font,
            color: theme.text,
            backgroundColor: theme.bg,
            padding: 0,
        },
        header: {
            backgroundColor: theme.primary,
            color: "white",
            padding: 35,
            flexDirection: "row",
            alignItems: "center",
        },
        avatar: {
            width: 100,
            height: 100,
            borderRadius: 50,
            border: "3pt solid white",
            marginRight: 25,
        },
        nameBlock: { flexGrow: 1 },
        name: { fontSize: 26, fontWeight: "bold", color: "white", marginBottom: 4 },
        subtitle: { fontSize: 12, color: "#E5E7EB" },
        contact: { fontSize: 10.5, color: "#F3F4F6", marginTop: 6 },
        content: { flexDirection: "row", padding: 30 },
        sidebar: {
            width: "34%",
            backgroundColor: theme.accent,
            padding: 22,
            borderRadius: 10,
            marginRight: 25,
            minHeight: "90%",
        },
        main: { width: "66%", paddingRight: 15 },
        h2: {
            fontSize: 15,
            color: theme.primary,
            fontWeight: "bold",
            marginBottom: 8,
            textTransform: "uppercase",
            borderBottom: `1.5pt solid ${theme.primary}`,
            paddingBottom: 4,
        },
        p: {
            fontSize: 12,
            marginBottom: 10,
            textAlign: "justify",
            lineHeight: 1.8,
        },
        skillTag: {
            backgroundColor: theme.primary,
            color: "white",
            fontSize: 10,
            padding: "5 8",
            borderRadius: 4,
            marginRight: 5,
            marginBottom: 6,
        },
        skillContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: 6 },
        block: { marginBottom: 18 },
    });

    return (
        <Document>
            <Page size="A4" style={s.page}>
                <View style={s.header}>
                    {o.photo && <Image src={o.photo} style={s.avatar} />}
                    <View style={s.nameBlock}>
                        <Text style={s.name}>{o.fullName}</Text>
                        <Text style={s.subtitle}>
                            {o.industry} • {o.experienceLevel}
                        </Text>
                        <Text style={s.contact}>
                            {o.email} • {o.phone}
                        </Text>
                    </View>
                </View>

                <View style={s.content}>
                    <View style={s.sidebar}>
                        <Text style={[s.h2, { color: theme.primary }]}>Skills</Text>
                        <View style={s.skillContainer}>
                            {o.skills
                                ?.split(/[,;\n]/)
                                .filter((s) => s.trim())
                                .map((skill, i) => (
                                    <Text key={i} style={s.skillTag}>
                                        {skill.trim()}
                                    </Text>
                                ))}
                        </View>

                        <View style={[s.block, { marginTop: 25 }]}>
                            <Text style={[s.h2, { color: theme.primary }]}>Education</Text>
                            {renderParagraphs(o.education, s.p)}
                        </View>

                        <View style={s.block}>
                            <Text style={[s.h2, { color: theme.primary }]}>Highlights</Text>
                            <Text style={[s.p, { fontStyle: "italic" }]}>
                                Innovative • Team Player • Fast Learner
                            </Text>
                        </View>
                    </View>

                    <View style={s.main}>
                        <View style={s.block}>
                            <Text style={s.h2}>Summary</Text>
                            {renderParagraphs(o.summary, s.p)}
                        </View>

                        <View style={s.block}>
                            <Text style={s.h2}>Experience</Text>
                            {renderParagraphs(o.workExperience, s.p)}
                        </View>

                        <View style={s.block}>
                            <Text style={s.h2}>Achievements</Text>
                            <Text style={s.p}>
                                - Improved project delivery efficiency by 30%.{"\n"}- Mentored junior developers.{"\n"}- Implemented scalable UI components with AI tools.
                            </Text>
                        </View>
                    </View>
                </View>
            </Page>

            {renderExtrasPages(o, theme)}
        </Document>
    );
};

const renderRichText = (text: string, style: any) => {
    if (!text) return null;

    const lines = text.split(/\n{2,}/).filter((l) => l.trim());
    return lines.map((line, i) => {
        if (line.trim().startsWith("- ")) {
            return (
                <View key={i}
                      style={{flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap", marginBottom: 4}}>
                    <Text style={{marginRight: 6}}>•</Text>
                    <Text style={[style, {flex: 1}]}>{line.replace(/^-\s*/, "")}</Text>
                </View>
            );
        }

        const parts = line.split(/(\*\*.*?\*\*)/g).filter(Boolean);
        return (
            <Text key={i} style={[style, {marginBottom: 5, lineHeight: 1.7}]}>
                {parts.map((p, j) =>
                    p.startsWith("**") && p.endsWith("**") ? (
                        <Text key={j} style={{fontWeight: "bold"}}>
                            {p.replace(/\*\*/g, "")}
                        </Text>
                    ) : (
                        <Text key={j}>{p}</Text>
                    )
                )}
            </Text>
        );
    });
};

//
// 🧠 MANAGER REVIEWED
//
export const ManagerReviewedCV = (o: CVOrderType) => {
    const themeColor = o.themeColor && o.themeColor !== "Default" ? o.themeColor : "#1E40AF";
    const accent = "#F3F4F6";
    const font = o.fontStyle && o.fontStyle !== "Default" ? o.fontStyle : "Helvetica";

    const s = StyleSheet.create({
        page: {
            fontFamily: font,
            color: "#111827",
            backgroundColor: "#FFFFFF",
            fontSize: 11.5,
            lineHeight: 1.6,
            flexDirection: "row",
            border: "1pt solid #E5E7EB",
            borderRadius: 6,
        },

        // 🟦 Sidebar
        sidebar: {
            width: "30%",
            backgroundColor: themeColor,
            color: "white",
            padding: 26,
            flexDirection: "column",
        },
        avatar: {
            width: 95,
            height: 95,
            borderRadius: 48,
            border: "2pt solid white",
            alignSelf: "center",
            marginBottom: 20,
        },
        name: {fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 4},
        position: {
            fontSize: 10.5,
            textAlign: "center",
            color: "#E0E7FF",
            marginBottom: 18,
            letterSpacing: 0.3,
        },
        sectionLabel: {
            marginTop: 14,
            marginBottom: 6,
            fontSize: 10.5,
            fontWeight: "bold",
            textTransform: "uppercase",
            borderBottom: "1pt solid #FFFFFF55",
            paddingBottom: 4,
        },
        sidebarText: {
            fontSize: 9.5,
            marginBottom: 4,
            color: "#E5E7EB",
            lineHeight: 1.4,
        },

        // 🟩 Main
        main: {
            width: "70%",
            padding: 36,
        },
        sectionTitle: {
            fontSize: 14,
            fontWeight: "bold",
            color: themeColor,
            marginTop: 14,
            marginBottom: 8,
            borderBottom: `1.5pt solid ${themeColor}`,
            paddingBottom: 3,
            textTransform: "uppercase",
        },
        paragraph: {fontSize: 11, marginBottom: 6, textAlign: "justify", lineHeight: 1.7},
        divider: {
            borderBottom: `1.5pt solid ${themeColor}`,
            marginVertical: 12,
            opacity: 0.8,
        },
        infoBox: {
            backgroundColor: accent,
            borderLeft: `4pt solid ${themeColor}`,
            padding: 10,
            borderRadius: 6,
            marginVertical: 10,
        },
        infoTitle: {fontSize: 12, color: themeColor, fontWeight: "bold", marginBottom: 6},
        footer: {
            marginTop: 30,
            textAlign: "center",
            fontSize: 10.5,
            color: themeColor,
        },
        signatureLine: {
            width: 160,
            borderBottom: `1pt solid ${themeColor}`,
            alignSelf: "center",
            marginTop: 6,
            marginBottom: 4,
        },
    });

    const renderSkills = (skills: string | undefined) =>
        skills
            ?.split(/[,;\n]/)
            .filter((s) => s.trim())
            .map((skill, i) => (
                <Text key={i} style={s.sidebarText}>
                    • {skill.trim()}
                </Text>
            ));

    return (
        <Document>
            {/* головна сторінка */}
            <Page size="A4" style={s.page}>
                <View style={s.sidebar}>
                    {o.photo && <Image src={o.photo} style={s.avatar}/>}
                    <Text style={s.name}>{o.fullName}</Text>
                    <Text style={s.position}>
                        {o.industry} • {o.experienceLevel}
                    </Text>

                    <Text style={s.sectionLabel}>Contact</Text>
                    <Text style={s.sidebarText}>{o.email}</Text>
                    <Text style={s.sidebarText}>{o.phone}</Text>

                    <Text style={s.sectionLabel}>Education</Text>
                    <Text style={s.sidebarText}>{o.education}</Text>

                    <Text style={s.sectionLabel}>Skills</Text>
                    {renderSkills(o.skills)}

                    <Text style={s.sectionLabel}>Languages</Text>
                    <Text style={s.sidebarText}>{o.languages || "English (Fluent)"}</Text>
                </View>

                <View style={s.main}>
                    <Text style={s.sectionTitle}>Professional Summary</Text>
                    {renderRichText(o.summary || "", s.paragraph)}

                    <View style={s.divider}/>

                    <Text style={s.sectionTitle}>Work Experience</Text>
                    {renderRichText(o.workExperience || "", s.paragraph)}

                    <View style={s.divider}/>

                    <Text style={s.sectionTitle}>Education</Text>
                    {renderRichText(o.education || "", s.paragraph)}

                    <View style={s.divider}/>

                    <Text style={s.sectionTitle}>Skills</Text>
                    {renderRichText(o.skills || "", s.paragraph)}

                    <View style={s.divider}/>
                </View>
            </Page>

            {/* EXTRAS */}
            {Object.keys(o.extrasData || {}).length > 0 &&
                Object.entries(o.extrasData ?? {}).map(([key, raw], idx) => {
                    const titleMap: Record<string, string> = {
                        coverLetter: "Cover Letter",
                        linkedin: "LinkedIn Summary",
                        keywords: "Keyword Optimization",
                        atsCheck: "ATS Compatibility",
                        jobAdaptation: "Job-Tailored Version",
                        achievements: "Achievements Boost",
                        skillsGap: "Skills Gap Report",
                    };
                    const title = titleMap[key] || key;
                    const value = String(raw)
                        .replace(/\*\*(.*?)\*\*/g, "$1")
                        .replace(/```[a-z]*\n?/g, "")
                        .replace(/```/g, "")
                        .replace(/\[Company's Name\]/g, o.industry || "the company")
                        .replace(/\[Your Email\]/g, o.email || "")
                        .replace(/\[Your Phone Number\]/g, o.phone || "")
                        .replace(/\[Hiring Manager's Name\]/g, "Hiring Manager");

                    return (
                        <Page
                            key={idx}
                            size="A4"
                            style={{
                                backgroundColor: "#FFFFFF",
                                fontFamily: font,
                                color: "#111827",
                                padding: 45,
                                lineHeight: 1.7,
                                border: "1pt solid #E5E7EB",
                                borderRadius: 6,
                            }}
                        >
                            <View
                                style={{
                                    borderBottom: `1.8pt solid ${themeColor}`,
                                    paddingBottom: 6,
                                    marginBottom: 12,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: "bold",
                                        color: themeColor,
                                        textAlign: "center",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {title}
                                </Text>
                            </View>

                            {renderRichText(value, {
                                fontSize: 12,
                                lineHeight: 1.7,
                                marginBottom: 8,
                                textAlign: "justify",
                            })}
                        </Page>
                    );
                })}
            <View style={{
                backgroundColor: accent,
                borderRadius: 14,
                padding: 32,
                margin: "38px 0 0 0",
                border: `2pt solid ${themeColor}`,
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: themeColor,
                    textAlign: "center",
                    marginBottom: 18,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                }}>
                    Manager’s Evaluation
                </Text>

                <View style={{
                    backgroundColor: "#fff",
                    borderLeft: `6pt solid ${themeColor}`,
                    padding: 18,
                    borderRadius: 10,
                    marginBottom: 18,
                }}>
                    <Text style={{
                        fontSize: 14,
                        color: themeColor,
                        fontWeight: "bold",
                        marginBottom: 8,
                    }}>
                        Manager’s Notes:
                    </Text>
                    <Text style={{
                        fontSize: 13,
                        textAlign: "justify",
                        lineHeight: 1.8,
                        color: "#1F2937",
                    }}>
                        This CV has been professionally reviewed for clarity, structure, and compliance with
                        international HR standards. The achievements were evaluated for measurable impact,
                        presentation quality, and professionalism.
                    </Text>
                </View>

                <Text style={{
                    fontSize: 14,
                    color: themeColor,
                    fontWeight: "bold",
                    marginBottom: 8,
                    marginTop: 10,
                }}>
                    Additional Recommendations:
                </Text>
                <Text style={{
                    fontSize: 13,
                    textAlign: "justify",
                    lineHeight: 1.8,
                    color: "#1F2937",
                    marginBottom: 18,
                }}>
                    • Strengthen quantifiable achievements with metrics.{"\n"}
                    • Include 1–2 leadership or collaboration examples.{"\n"}
                    • Maintain a consistent tone of confidence and initiative.
                </Text>

                <View style={{
                    marginTop: 32,
                    borderTop: `1.5pt solid ${themeColor}`,
                    paddingTop: 14,
                    textAlign: "center",
                }}>
                    <Text style={{
                        fontSize: 12,
                        color: themeColor,
                        fontWeight: "bold",
                    }}>
                        Reviewed & Approved by Senior Manager
                    </Text>
                    <View style={{
                        width: 160,
                        borderBottom: `1.5pt solid ${themeColor}`,
                        alignSelf: "center",
                        marginTop: 10,
                    }}/>
                    <Text style={{fontStyle: "italic", fontSize: 11, color: themeColor, marginTop: 6}}>
                        Human Resources Department
                    </Text>
                </View>
            </View>

        </Document>
);
};