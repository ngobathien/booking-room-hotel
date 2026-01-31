import type { RoomType } from "../../types/room-types.types";
import api from "./apiClient";

export const getAllRoomTypes = async (): Promise<RoomType[]> => {
  try {
    const response = await api.get("/room-types");
    // console.log("getAllRoomTypes:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phòng:", error);
    throw error;
  }
};

export const getDetailRoomTypeById = async (roomId: string) => {
  try {
    const response = await api.get(`/room-types/${roomId}`);
    console.log("getDetailRoomById:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phòng:", error);
    throw error;
  }
};

export const createNewRoomType = async (newRoomTypeData: RoomType) => {
  try {
    const response = await api.post(`/room-types`, newRoomTypeData);
    return response.data;
  } catch (error) {
    console.error("Error creating room type:", error);
    throw error;
  }
};

export const deleteRoomTypeById = async (id: string) => {
  try {
    const response = await api.delete(`/room-types/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error creating room type:", error);
    throw error;
  }
};

export const updateRoomType = () => {};

export const deleteAllRooms = () => {};
