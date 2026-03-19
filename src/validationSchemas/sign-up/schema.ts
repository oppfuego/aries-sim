import { AlertColor } from "@mui/material/Alert";
import { allowedRegistrationCountryNames } from "@/resources/countries";

export const signUpInitialValues = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    country: "",
    postCode: "",
    password: "",
    confirmPassword: "",
    terms: false,
};

type SignUpErrors = Partial<Record<keyof typeof signUpInitialValues, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const trim = (value: string) => value.trim();

const isValidDate = (value: string) => {
    if (!value) return false;
    const date = new Date(value);
    return !Number.isNaN(date.getTime());
};

export const signUpValidation = (values: typeof signUpInitialValues) => {
    const errors: SignUpErrors = {};

    if (!trim(values.firstName)) errors.firstName = "First name is required";
    if (!trim(values.lastName)) errors.lastName = "Last name is required";
    if (!trim(values.dateOfBirth)) {
        errors.dateOfBirth = "Date of birth is required";
    } else if (!isValidDate(values.dateOfBirth)) {
        errors.dateOfBirth = "Enter a valid date of birth";
    }

    if (!trim(values.email)) {
        errors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(trim(values.email))) {
        errors.email = "Invalid email";
    }

    if (!trim(values.phoneNumber)) errors.phoneNumber = "Phone number is required";
    if (!trim(values.street)) errors.street = "Street is required";
    if (!trim(values.city)) errors.city = "City is required";

    if (!trim(values.country)) {
        errors.country = "Country is required";
    } else if (!allowedRegistrationCountryNames.has(trim(values.country))) {
        errors.country = "Select a supported country";
    }

    if (!trim(values.postCode)) errors.postCode = "Post code is required";

    if (!values.password) {
        errors.password = "Password is required";
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm your password";
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords do not match";
    }

    if (!values.terms) {
        errors.terms = "You must agree to the Terms and Conditions";
    }

    return errors;
};

export const signUpOnSubmit = async (
    values: typeof signUpInitialValues,
    { setSubmitting }: { setSubmitting: (v: boolean) => void },
    showAlert: (msg: string, desc?: string, severity?: AlertColor) => void,
    router: { replace: (url: string) => void; refresh: () => void }
) => {
    try {
        const payload = {
            firstName: trim(values.firstName),
            lastName: trim(values.lastName),
            dateOfBirth: values.dateOfBirth,
            email: trim(values.email),
            phoneNumber: trim(values.phoneNumber),
            street: trim(values.street),
            city: trim(values.city),
            country: trim(values.country),
            postCode: trim(values.postCode),
            password: values.password,
        };

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (res.ok && data?.user) {
            showAlert("Registration successful", "", "success");
            router.replace("/");
            router.refresh();
        } else {
            showAlert(data?.message || "Registration failed", "", "error");
        }
    } catch (e: any) {
        showAlert(e?.message || "Network error", "", "error");
    } finally {
        setSubmitting(false);
    }
};
