export type UserRole = "user" | "admin";

export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    street: string;
    city: string;
    country: string;
    postCode: string;
    role: UserRole;
    tokens: number | null;
    phone?: string;
    birthDate?: string;
    address?: {
        street: string;
        city: string;
        country: string;
        zip: string;
    };
    createdAt: string;
    updatedAt: string;
}

export type Nullable<T> = T | null;

export interface UserResponse {
    user: IUser;
}
