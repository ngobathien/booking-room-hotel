import type { CreateUserPayload, User } from "../../types/user.types";
import api from "./apiClient";

export const uploadAvatar = async (userId: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(`/users/${userId}/avatar`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.avatarUrl;
};

// Lấy danh sách user
export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// Tạo user
export const createUser = async (userData: CreateUserPayload) => {
  const response = await api.post("/users", userData);
  return response.data;
};

// Update user
export const updateUser = async (userId: string, userData: Partial<User>) => {
  if (!userId) {
    throw new Error("ID người dùng không được xác định");
  }

  const response = await api.patch(`/users/${userId}`, userData);
  return response.data;
};

// Xóa user
export const deleteUser = async (userId: string) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};
