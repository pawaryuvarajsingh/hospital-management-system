import axios from "axios";

const authAPI = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Login user
export const loginUser = async (credentials) => {
  const response = await authAPI.post("/auth/login", {
    username: credentials.username,
    password: credentials.password,
    expiresInMins: 30,
  });

  return response.data;
};

// Get currently authenticated user
export const getCurrentUser = async (token) => {
  const response = await authAPI.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Logout (remove session from browser)
export const logoutUser = () => {
  localStorage.removeItem("hospital_token");
  localStorage.removeItem("hospital_user");
};