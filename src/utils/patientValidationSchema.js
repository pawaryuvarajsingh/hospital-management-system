
import * as yup from "yup";

export const patientValidationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .required("First name is required"),

  lastName: yup
    .string()
    .trim()
    .required("Last name is required"),

  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email address is required"),

  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
    .required("Phone number is required"),

  age: yup
    .number()
    .typeError("Age must be a number")
    .integer("Age must be a whole number")
    .min(1, "Age must be at least 1")
    .max(120, "Age cannot exceed 120")
    .required("Age is required"),

  gender: yup
    .string()
    .oneOf(["Male", "Female", "Other"], "Select a valid gender")
    .required("Gender is required"),

  bloodGroup: yup
    .string()
    .required("Blood group is required"),

  address: yup
    .string()
    .trim()
    .required("Address is required"),
});
