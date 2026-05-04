import mongoose, { Schema, Document } from "mongoose";

export type OrderState =
    | "PENDING"
    | "PROCESSING"
    | "APPROVED"
    | "DECLINED"
    | "ERROR"
    | "FILTERED"
    | "CHAIN_STEP"
    | "UNKNOWN";

export interface PaymentOrderDocument extends Document {
    userId: mongoose.Types.ObjectId;
    email: string;
    packageId: string;
    packageName: string;
    currency: string;
    amountNet: number;
    vatAmount: number;
    amountGross: number;
    tokens: number;
    status: OrderState;
    orderMerchantId: string;
    orderSystemId: string | null;
    gatewayResponse: Record<string, unknown> | null;
    creditedTokens: number;
    createdAt: Date;
    updatedAt: Date;
}

const paymentOrderSchema = new Schema<PaymentOrderDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        email: { type: String, required: true },
        packageId: { type: String, required: true },
        packageName: { type: String, required: true },
        currency: { type: String, required: true },
        amountNet: { type: Number, required: true },
        vatAmount: { type: Number, default: 0 },
        amountGross: { type: Number, required: true },
        tokens: { type: Number, required: true },
        status: {
            type: String,
            enum: ["PENDING", "PROCESSING", "APPROVED", "DECLINED", "ERROR", "FILTERED", "CHAIN_STEP", "UNKNOWN"],
            default: "PENDING",
        },
        orderMerchantId: { type: String, required: true, unique: true, index: true },
        orderSystemId: { type: String, default: null, sparse: true },
        gatewayResponse: { type: Schema.Types.Mixed, default: null },
        creditedTokens: { type: Number, default: 0 },
    },
    { timestamps: true },
);

export const PaymentOrder =
    mongoose.models.PaymentOrder ||
    mongoose.model<PaymentOrderDocument>("PaymentOrder", paymentOrderSchema);
