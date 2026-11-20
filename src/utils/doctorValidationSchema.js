
import * as yup from "yup";

export const doctorValidationSchema = yup.object({
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

  specialization: yup
    .string()
    .required("Select a specialization"),

  qualification: yup
    .string()
    .trim()
    .required("Qualification is required"),

  experience: yup
    .number()
    .typeError("Experience must be a number")
    .integer("Experience must be a whole number")
    .min(0, "Experience cannot be negative")
    .max(60, "Experience cannot exceed 60 years")
    .required("Experience is required"),

  availability: yup
    .string()
    .oneOf(
      ["Available", "Unavailable", "On Leave"],
      "Select a valid availability status"
    )
    .required("Availability is required"),

  address: yup
    .string()
    .trim()
    .required("Address is required"),
});
