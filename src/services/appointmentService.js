
import axios from "axios";

const API_URL = "https://dummyjson.com";

const appointmentApi = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Fetch patients for appointment booking
export const getAppointmentPatients = async () => {
  const response = await appointmentApi.get("/users?limit=100");
  return response.data.users;
};

// Fetch doctors (demo API data)
export const getAppointmentDoctors = async () => {
  const response = await appointmentApi.get("/users?limit=100");
  return response.data.users;
};

// Demo appointment creation
export const createAppointment = async (appointmentData) => {
  const response = await appointmentApi.post("/posts/add", {
    title: "Hospital Appointment",
    body: JSON.stringify(appointmentData),
    userId: Number(appointmentData.patientId) || 1,
  });

  return response.data;
};

// Demo appointment update
export const updateAppointment = async (id, appointmentData) => {
  const response = await appointmentApi.put(`/posts/${id}`, {
    title: "Hospital Appointment",
    body: JSON.stringify(appointmentData),
  });

  return response.data;
};

// Demo appointment deletion
export const deleteAppointment = async (id) => {
  const response = await appointmentApi.delete(`/posts/${id}`);
  return response.data;
};
