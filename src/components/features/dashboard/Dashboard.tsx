"use client";

import React, { useState } from "react";
import AllOrders from "@/components/widgets/all-orders/AllOrders";
import TransactionHistory from "@/components/widgets/all-transactions/AllTransactions";
import styles from "./Dashboard.module.scss";
import AllSeoRequests from "@/components/widgets/all-orders/AllSeo";
import AllEsimOrders from "@/components/extra/e-sim/all-orders/AllOrders";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<"orders" | "transactions">("orders");

    return (
        <div className={styles.dashboard}>
            {/* 🔹 Панель перемикача */}
            <div className={styles.toggleBar}>
                <button
                    className={`${styles.toggleButton} ${
                        activeTab === "orders" ? styles.active : ""
                    }`}
                    onClick={() => setActiveTab("orders")}
                >
                    Orders
                </button>
                <button
                    className={`${styles.toggleButton} ${
                        activeTab === "transactions" ? styles.active : ""
                    }`}
                    onClick={() => setActiveTab("transactions")}
                >
                    Transactions
                </button>
            </div>

            {/* 🔹 Контент */}
            <div className={styles.content}>
                {activeTab === "orders" ? (
                    <div key="orders" className={styles.fadeIn}>
                        <AllEsimOrders  />
                    </div>
                ) : (
                    <div key="transactions" className={styles.fadeIn}>
                        <TransactionHistory />
                    </div>
                )}
            </div>
        </div>
    );
}
