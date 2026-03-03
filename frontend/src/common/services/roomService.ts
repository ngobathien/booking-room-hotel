import type {
  CreateRoomPayload,
  SearchRoomParams,
  SearchRoomResponse,
} from "../../types/room.types";
import api from "./apiClient";

export const getAllRooms = async (params?: any) => {
  try {
    const response = await api.get("/rooms", { params });
    // console.log("getAllRooms:", response.data.data);
    return response.data.data; // Trả về mảng rooms từ response
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phòng:", error);
    throw error;
  }
};

export const getDetailRoomById = async (roomId: string) => {
  try {
    const response = await api.get(`/rooms/${roomId}`);
    console.log("getDetailRoomById:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phòng:", error);
    throw error;
  }
};

// search room theo ngày check-in, check-out và số lượng khách
export const searchAvailableRooms = async (
  params: SearchRoomParams,
): Promise<SearchRoomResponse> => {
  try {
    const response = await api.get(`/rooms/search`, { params });
    return response.data;
  } catch (error) {
    console.error("Error searching available rooms:", error);
    throw error;
  }
};

// tạo room mới với ảnh
export const createNewRoom = async (
  newRoomData: CreateRoomPayload,
  files?: File[],
) => {
  const formData = new FormData();

  // append text fields
  Object.entries(newRoomData).forEach(([key, value]) => {
    if (value) formData.append(key, value as any);
  });

  // append file nếu có
  if (files && files.length > 0) {
    files.forEach((file) => {
      formData.append("files", file);
    });
  }

  const response = await api.post(`/rooms`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteRoomById = async (roomId: string) => {
  try {
    const response = await api.delete(`/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  }
};

export const updateRoom = async (roomId: string, data: CreateRoomPayload) => {
  try {
    const response = await api.patch(`/rooms/${roomId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating room:", error);
    throw error;
  }
};

export const deleteAllRooms = () => {};
