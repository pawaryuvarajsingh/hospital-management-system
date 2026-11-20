
export const doctorFormFields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter first name",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter last name",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter email address",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter phone number",
  },
  {
    name: "specialization",
    label: "Specialization",
    type: "select",
    options: [
      "Cardiology",
      "Dermatology",
      "Neurology",
      "Orthopedics",
      "Pediatrics",
      "General Medicine",
      "Gynecology",
      "Ophthalmology",
      "ENT",
      "Psychiatry",
    ],
  },
  {
    name: "qualification",
    label: "Qualification",
    type: "text",
    placeholder: "e.g. MBBS, MD",
  },
  {
    name: "experience",
    label: "Experience (Years)",
    type: "number",
    placeholder: "Enter experience",
  },
  {
    name: "availability",
    label: "Availability",
    type: "select",
    options: ["Available", "Unavailable", "On Leave"],
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter address",
  },
];

export const initialDoctorForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  specialization: "",
  qualification: "",
  experience: "",
  availability: "Available",
  address: "",
};
