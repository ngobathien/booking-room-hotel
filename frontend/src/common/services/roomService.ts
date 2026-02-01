import api from "./apiClient";

export const getAllRooms = async () => {
  try {
    const response = await api.get("/rooms");
    // console.log("getAllRooms:", response.data);
    return response.data;
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

export interface CreateRoomPayload {
  roomNumber: string;
  hotelId: string;
  roomType: string; // ObjectId
  status: "AVAILABLE" | "BOOKED" | "MAINTENANCE";
  thumbnail?: string;
  images?: string[];
}
export const createNewRoom = () => {};

export const deleteRoomById = async (id: string) => {
  try {
    const response = await api.delete(`/rooms/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};
export const updateRoom = () => {};
export const deleteAllRooms = () => {};
