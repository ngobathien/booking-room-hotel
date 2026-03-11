import type { CheckRoomAvailabilityParams } from "../../types/booking.types";
import apiClient from "./apiClient";

export const checkRoomAvailability = async (
  params: CheckRoomAvailabilityParams,
) => {
  const res = await apiClient.get("/bookings/check-availability", {
    params,
  });

  return res.data;
};

export const createBooking = async (data: {
  room: string;
  checkInDate: string;
  checkOutDate: string;
}) => {
  const res = await apiClient.post("/bookings", data);
  return res.data;
};

export const getAllBookings = async () => {
  const res = await apiClient.get("/bookings");
  return res.data.data;
};

// lấy booking của user hiện tại
export const getMyBookings = async () => {
  const res = await apiClient.get("/bookings/my-bookings");
  return res.data;
};

// hủy booking
export const cancelBooking = async (id: string) => {
  const res = await apiClient.delete(`/bookings/${id}`);
  return res.data;
};
