// src/services/amenities.service.ts
import type { Amenity } from "../../types/amenity.types";
import apiClient from "./apiClient";

const API_URL = "/amenities";

export const getAllAmenities = async (): Promise<Amenity[]> => {
  const res = await apiClient.get(API_URL);
  return res.data;
};

export const getAmenityById = async (id: string): Promise<Amenity> => {
  const res = await apiClient.get(`${API_URL}/${id}`);
  return res.data;
};

export const createAmenity = async (data: {
  name: string;
  icon?: string;
}): Promise<Amenity> => {
  const res = await apiClient.post(API_URL, data);
  return res.data;
};

export const updateAmenity = async (
  id: string,
  data: { name: string; icon?: string },
): Promise<Amenity> => {
  const res = await apiClient.patch(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteAmenity = async (id: string): Promise<void> => {
  await apiClient.delete(`${API_URL}/${id}`);
};
