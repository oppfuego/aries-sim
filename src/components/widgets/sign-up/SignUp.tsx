"use client";

import { Formik, FormikHelpers } from "formik";
import { useAlert } from "@/context/AlertContext";
import { useRouter } from "next/navigation";
import {
    signUpValidation,
    signUpInitialValues,
    signUpOnSubmit,
} from "@/validationSchemas/sign-up/schema";
import FormUI from "@/components/ui/form/FormUI";

export type SignUpValues = typeof signUpInitialValues;

export default function SignUpPage() {
    const { showAlert } = useAlert();
    const router = useRouter();

    return (
        <Formik<SignUpValues>
            initialValues={signUpInitialValues}
            validate={signUpValidation}
            onSubmit={async (
                values,
                { setSubmitting }: FormikHelpers<SignUpValues>
            ) => signUpOnSubmit(values, { setSubmitting }, showAlert, router)}
        >
            {({ isSubmitting }) => (
                <FormUI
                    title="Sign Up"
                    description="Create your account"
                    isSubmitting={isSubmitting}
                    submitLabel="Sign Up"
                    showTerms
                    variant="register"
                    fields={[
                        { name: "firstName", type: "text", placeholder: "First name" },
                        { name: "lastName", type: "text", placeholder: "Last name" },
                        { name: "email", type: "email", placeholder: "Email" },
                        { name: "password", type: "password", placeholder: "Password" },
                        { name: "phone", type: "tel", placeholder: "Phone number" },
                        { name: "birthDate", type: "date", placeholder: "Date of birth" },

                        { name: "addressStreet", type: "text", placeholder: "Street" },
                        { name: "addressCity", type: "text", placeholder: "City" },
                        { name: "addressCountry", type: "text", placeholder: "Country" },
                        { name: "addressZip", type: "text", placeholder: "Postal code" },
                    ]}
                />
            )}
        </Formik>
    );
}