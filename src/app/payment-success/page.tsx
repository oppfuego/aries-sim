"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order");
    const { showAlert } = useAlert();

    useEffect(() => {
        localStorage.removeItem("selectedPlan");
        showAlert("Payment Successful", "Your tokens have been added to your account.", "success");
    }, []);

    return (
        <div style={{
            maxWidth: 600,
            margin: "80px auto",
            textAlign: "center",
            padding: "40px 20px",
        }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>&#10003;</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12, color: "var(--text-primary)" }}>
                Payment Successful
            </h1>
            <p style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 8 }}>
                Your tokens have been added to your account.
            </p>
            {orderId && (
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>
                    Order: {orderId}
                </p>
            )}
            <a
                href="/profile"
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
                Go to Profile
            </a>
            <a
                href="/pricing"
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
                Back to Pricing
            </a>
        </div>
    );
}
