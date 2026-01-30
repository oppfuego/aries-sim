import { Document, Types } from "mongoose";

export interface IUserSchema extends Document {
    _id: Types.ObjectId;

    firstName: string;
    lastName: string;

    email: string;
    password: string;

    phone: string;
    birthDate: Date;

    address: {
        street: string;
        city: string;
        country: string;
        zip: string;
    };

    tokens: number;
    role: "user" | "admin";

    createdAt: Date;
    updatedAt: Date;
}

export interface UserType {
    _id: string;

    firstName: string;
    lastName: string;

    email: string;
    phone: string;
    birthDate: Date;

    address: {
        street: string;
        city: string;
        country: string;
        zip: string;
    };

    tokens: number;
    role: "user" | "admin";

    createdAt: Date;
    updatedAt: Date;
}