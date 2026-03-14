import type {
  LoginData,
  RegisterData,
  VerifyOtp,
} from "../../types/auth.types.ts";
import api from "./apiClient.ts";

// Đăng ký

export const register = async (userData: RegisterData) => {
  try {
    const response = await api.post("/auth/register", userData);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error khi register:", error);
    throw error;
  }
};

// Đăng nhập
export const loginApi = async (userData: LoginData) => {
  try {
    const response = await api.post("/auth/login", userData);
    // console.log("response", response);
    // console.log("response data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error khi login:", error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get("/auth/profile");
    // console.log("response", response);
    // console.log("response data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error khi getProfile:", error);
    throw error;
  }
};

export const forgotPasswordApi = async (email: string) => {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    console.log("response", response);
    // console.log("response data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const resetPasswordApi = async (
  resetToken: string,
  newPassword: string,
) => {
  try {
    const response = await api.post("/auth/reset-password", {
      resetToken,
      newPassword,
    });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const changePasswordApi = async (
  oldPassword: string,
  newPassword: string,
) => {
  try {
    const response = await api.put("/auth/change-password", {
      oldPassword,
      newPassword,
    });
    // console.log("response", response);
    // console.log("response data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const verifyOtp = async (data: VerifyOtp) => {
  try {
    const response = await api.post("/auth/verify-otp", data);
    // console.log("response", response);
    // console.log("response data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// gửi lại mã otp
export const resendOtp = async (email: VerifyOtp["email"]) => {
  try {
    const response = await api.post("/auth/resend-otp", { email });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
