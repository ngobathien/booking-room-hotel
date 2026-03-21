import type {
  CreateHotelDto,
  Hotel,
  UpdateHotelDto,
} from "../../types/hotel.types";
import apiClient from "./apiClient";

const BASE_URL = "/hotels";

export const hotelService = {
  // GET ALL
  getAll: async (): Promise<Hotel[]> => {
    const res = await apiClient.get(BASE_URL);
    return res.data;
  },

  // GET ONE
  getById: async (id: string): Promise<Hotel> => {
    const res = await apiClient.get(`${BASE_URL}/${id}`);
    return res.data;
  },

  // CREATE
  create: async (data: CreateHotelDto): Promise<Hotel> => {
    const res = await apiClient.post(BASE_URL, data);
    return res.data;
  },

  // UPDATE
  update: async (id: string, data: UpdateHotelDto): Promise<Hotel> => {
    const res = await apiClient.put(`${BASE_URL}/${id}`, data);
    return res.data;
  },

  // DELETE
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${BASE_URL}/${id}`);
  },
};
