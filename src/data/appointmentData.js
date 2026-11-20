
export const appointmentStatusOptions = [
  "Scheduled",
  "Confirmed",
  "Completed",
  "Cancelled",
];

export const appointmentTypeOptions = [
  "Consultation",
  "Follow-up",
  "Emergency",
  "Routine Checkup",
  "Surgery Consultation",
];

export const initialAppointmentForm = {
  patientId: "",
  doctorId: "",
  appointmentDate: "",
  appointmentTime: "",
  appointmentType: "Consultation",
  reason: "",
  status: "Scheduled",
  notes: "",
};
