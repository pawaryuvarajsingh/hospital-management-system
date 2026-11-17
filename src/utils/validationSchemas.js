import * as yup from "yup";

// Login validation
export const loginSchema = yup.object({
  username: yup
    .string()
    .required("Username is required"),

  password: yup
    .string()
    .required("Password is required"),
});

// Registration validation
export const registerSchema = yup.object({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Name must contain at least 3 characters"),

  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters"),

  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),

  role: yup
    .string()
    .oneOf(
      ["Admin", "Doctor", "Receptionist", "Patient"],
      "Select a valid role"
    )
    .required("Please select a role"),
});

// Forgot password validation
export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
});

// Reset password validation
export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters"),

  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});