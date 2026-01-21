import axios from "axios";
import api from "./apiClient.ts";

const auth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 100000,
  headers: { "Content-Type": "application/json" },
});

interface LoginData {
  email: string;
  password: string;
}

// Đăng ký

export const register = async (userData: any) => {
  try {
    const response = await api.post("/auth/register", userData);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

// Đăng nhập

export const login = async (userData: any) => {
  try {
    const response = await api.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
