"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

export default function PaymentFailedPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order");
    const reason = searchParams.get("reason");
    const { showAlert } = useAlert();

    useEffect(() => {
        showAlert("Payment Failed", reason || "Your payment could not be processed.", "error");
    }, []);

    return (
        <div style={{
            maxWidth: 600,
            margin: "80px auto",
            textAlign: "center",
            padding: "40px 20px",
        }}>
            <div style={{ fontSize: 48, marginBottom: 16, color: "#ef4444" }}>&#10007;</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12, color: "var(--text-primary)" }}>
                Payment Failed
            </h1>
            <p style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 8 }}>
                {reason || "Your payment could not be processed. Please try again."}
            </p>
            {orderId && (
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>
                    Order: {orderId}
                </p>
            )}
            <a
                href="/pricing"
                style={{
                    display: "inline-block",
                    padding: "12px 32px",
                    background: "var(--primary-color)",
                    color: "var(--text-inverse)",
                    borderRadius: 8,
                    fontWeight: 600,
                    textDecoration: "none",
                    marginRight: 12,
                }}
            >
                Try Again
            </a>
            <a
                href="/"
                style={{
                    display: "inline-block",
                    padding: "12px 32px",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                    borderRadius: 8,
                    fontWeight: 500,
                    textDecoration: "none",
                }}
            >
                Go Home
            </a>
        </div>
    );
}
