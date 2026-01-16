import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { connectDB } from "@/backend/config/db";
import { EsimOrder } from "@/backend/models/esimOrder.model";

export async function GET(req: NextRequest) {
    try {
        const payload = await requireAuth(req);
        await connectDB();

        const orders = await EsimOrder.find({
            userId: payload.sub,
        }).sort({ createdAt: -1 });

        return NextResponse.json({ orders });
    } catch (err: any) {
        return NextResponse.json(
            { message: err.message || "Failed to fetch orders" },
            { status: 401 }
        );
    }
}