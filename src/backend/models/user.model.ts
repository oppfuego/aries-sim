import mongoose, { Schema, Model } from "mongoose";
import { IUserSchema } from "@/backend/types/user.types";

const UserSchema: Schema<IUserSchema> = new Schema(
    {
            firstName: { type: String, required: true, trim: true },
            lastName: { type: String, required: true, trim: true },

            email: {
                    type: String,
                    required: true,
                    unique: true,
                    lowercase: true,
                    index: true,
            },

            password: { type: String, required: true, select: false },

            phoneNumber: { type: String, trim: true },
            dateOfBirth: { type: Date },
            street: { type: String, trim: true },
            city: { type: String, trim: true },
            country: { type: String, trim: true },
            postCode: { type: String, trim: true },

            phone: { type: String, required: true },

            birthDate: { type: Date, required: true },

            address: {
                    street: { type: String, required: true },
                    city: { type: String, required: true },
                    country: { type: String, required: true },
                    zip: { type: String, required: true },
            },

            role: { type: String, enum: ["user", "admin"], default: "user" },
            tokens: { type: Number, default: 10 },
    },
    { timestamps: true }
);

UserSchema.pre("save", function syncRegistrationFields(next) {
    if (!this.phoneNumber && this.phone) this.phoneNumber = this.phone;
    if (!this.phone && this.phoneNumber) this.phone = this.phoneNumber;

    if (!this.dateOfBirth && this.birthDate) this.dateOfBirth = this.birthDate;
    if (!this.birthDate && this.dateOfBirth) this.birthDate = this.dateOfBirth;

    if (!this.street && this.address?.street) this.street = this.address.street;
    if (!this.city && this.address?.city) this.city = this.address.city;
    if (!this.country && this.address?.country) this.country = this.address.country;
    if (!this.postCode && this.address?.zip) this.postCode = this.address.zip;

    if (!this.address) {
        this.address = {
            street: this.street || "",
            city: this.city || "",
            country: this.country || "",
            zip: this.postCode || "",
        };
    } else {
        if (!this.address.street && this.street) this.address.street = this.street;
        if (!this.address.city && this.city) this.address.city = this.city;
        if (!this.address.country && this.country) this.address.country = this.country;
        if (!this.address.zip && this.postCode) this.address.zip = this.postCode;
    }

    next();
});

export const User: Model<IUserSchema> =
    mongoose.models.User || mongoose.model<IUserSchema>("User", UserSchema);
