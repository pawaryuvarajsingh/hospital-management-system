
import axios from "axios";

const API_URL = "https://dummyjson.com/users";

const doctorApi = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Get all doctors
export const getDoctors = async () => {
  const response = await doctorApi.get("?limit=100");
  return response.data.users;
};

// Get one doctor
export const getDoctorById = async (id) => {
  const response = await doctorApi.get(`/${id}`);
  return response.data;
};

// Add a doctor
export const addDoctor = async (doctorData) => {
  const response = await doctorApi.post("/add", doctorData);
  return response.data;
};

// Update a doctor
export const updateDoctor = async (id, doctorData) => {
  const response = await doctorApi.put(`/${id}`, doctorData);
  return response.data;
};

// Delete a doctor
export const deleteDoctor = async (id) => {
  const response = await doctorApi.delete(`/${id}`);
  return response.data;
};
