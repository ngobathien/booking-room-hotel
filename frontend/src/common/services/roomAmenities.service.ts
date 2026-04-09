// services/roomAmenitiesService.ts
import apiClient from "./apiClient";

export const getAmenitiesByRoom = async (roomId: string) => {
  const res = await apiClient.get(`/room-amenities/${roomId}`);
  return res.data.map((ra: any) => ra.amenityId);
};

export const assignAmenitiesToRoom = async (
  roomId: string,
  amenityIds: string[],
) => {
  return apiClient.post(`/room-amenities`, { roomId, amenityIds });
};

export const removeAllAmenitiesFromRoom = async (roomId: string) => {
  return apiClient.delete(`/room-amenities/${roomId}`);
};
