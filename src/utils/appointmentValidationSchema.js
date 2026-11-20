
import * as yup from "yup";

export const appointmentValidationSchema = yup.object({
  patientId: yup
    .string()
    .required("Please select a patient"),

  doctorId: yup
    .string()
    .required("Please select a doctor"),

  appointmentDate: yup
    .string()
    .required("Please select an appointment date")
    .test(
      "valid-date",
      "Please enter a valid date",
      (value) => !value || !Number.isNaN(Date.parse(value))
    )
    .test(
      "future-date",
      "Appointment date cannot be in the past",
      (value) => {
        if (!value) return true;

        const selectedDate = new Date(`${value}T00:00:00`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return selectedDate >= today;
      }
    ),

  appointmentTime: yup
    .string()
    .required("Please select an appointment time"),

  appointmentType: yup
    .string()
    .oneOf(
      [
        "Consultation",
        "Follow-up",
        "Emergency",
        "Routine Checkup",
        "Surgery Consultation",
      ],
      "Please select a valid appointment type"
    )
    .required("Appointment type is required"),

  reason: yup
    .string()
    .trim()
    .required("Appointment reason is required")
    .max(300, "Reason cannot exceed 300 characters"),

  status: yup
    .string()
    .oneOf(
      ["Scheduled", "Confirmed", "Completed", "Cancelled"],
      "Please select a valid appointment status"
    )
    .required("Appointment status is required"),

  notes: yup
    .string()
    .max(500, "Notes cannot exceed 500 characters")
    .default(""),
});
