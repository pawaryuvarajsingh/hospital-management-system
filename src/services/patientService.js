
import axios from "axios";

const API_URL = "https://dummyjson.com/users";

const patientApi = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Get all patients
export const getPatients = async () => {
  const response = await patientApi.get("?limit=100");
  return response.data.users;
};

// Get one patient
export const getPatientById = async (id) => {
  const response = await patientApi.get(`/${id}`);
  return response.data;
};

// Add a patient
export const addPatient = async (patientData) => {
  const response = await patientApi.post("/add", patientData);
  return response.data;
};

// Update a patient
export const updatePatient = async (id, patientData) => {
  const response = await patientApi.put(`/${id}`, patientData);
  return response.data;
};

// Delete a patient
export const deletePatient = async (id) => {
  const response = await patientApi.delete(`/${id}`);
  return response.data;
};
