import type {
  CreateHotelDto,
  Hotel,
  UpdateHotelDto,
} from "../../types/hotel.types";
import apiClient from "./apiClient";

const BASE_URL = "/hotels";

// GET INFO
export const getHotelInfo = async (): Promise<Hotel> => {
  const res = await apiClient.get("/hotels/info");
  return res.data;
};

// GET ALL
export const getAllHotels = async (): Promise<Hotel[]> => {
  const res = await apiClient.get(BASE_URL);
  return res.data;
};

// GET ONE
export const getHotelById = async (id: string): Promise<Hotel> => {
  const res = await apiClient.get(`${BASE_URL}/${id}`);
  return res.data;
};

// CREATE
export const createHotel = async (data: CreateHotelDto): Promise<Hotel> => {
  const res = await apiClient.post(BASE_URL, data);
  return res.data;
};

// UPDATE
export const updateHotel = async (
  id: string,
  data: UpdateHotelDto,
): Promise<Hotel> => {
  const res = await apiClient.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

// DELETE
export const deleteHotel = async (id: string): Promise<void> => {
  await apiClient.delete(`${BASE_URL}/${id}`);
};
