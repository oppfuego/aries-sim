"use client";

import { useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import ContactUsForm from "@/components/widgets/contact-form/ContactForm";
import SeoRequestForm from "@/components/extra/seo/seo-form/SeoForm";

export default function ContactUsPage() {
    const user = useUser();
    const search = useSearchParams();
    const service = search.get("service");
    const tokens = Number(search.get("tokens") || 30);

    if (!service) {
        return (
            <div className="container" style={{ padding: "60px 0" }}>
                <ContactUsForm />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container" style={{ padding: "60px 0" }}>
                <h2>Login required</h2>
                <p>You must log in to request this SEO service.</p>
                <ContactUsForm />
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: "60px 0" }}>
            <SeoRequestForm
                service={service}
                tokens={tokens}
                title={`Request ${service}`}
                description={`Submitting this request will deduct ${tokens} tokens from your balance.`}
            />
        </div>
    );
}
