import type {
  CheckRoomAvailabilityParams,
  CreateBookingPayload,
} from "../../types/booking.types";
import apiClient from "./apiClient";

/* ======================= CHECK ROOM AVAILABILITY ======================= */

export const checkRoomAvailability = async (
  params: CheckRoomAvailabilityParams,
) => {
  const res = await apiClient.get("/bookings/check-availability", {
    params,
  });

  return res.data;
};

/* ======================= CREATE BOOKING ======================= */

export const createBooking = async (data: CreateBookingPayload) => {
  const res = await apiClient.post("/bookings", data);

  return res.data;
};

/* ======================= GET ALL BOOKINGS (ADMIN) ======================= */

export const getAllBookings = async () => {
  const res = await apiClient.get("/bookings");

  return res.data.data;
};

/* ======================= GET BOOKING DETAIL ======================= */

export const getBookingById = async (id: string) => {
  const res = await apiClient.get(`/bookings/${id}`);

  return res.data.data;
};

/* ======================= GET MY BOOKINGS ======================= */

export const getMyBookings = async () => {
  const res = await apiClient.get("/bookings/me");

  return res.data;
};

/* ======================= CANCEL BOOKING ======================= */

export const cancelBooking = async (id: string) => {
  const res = await apiClient.delete(`/bookings/${id}/cancel`);

  return res.data;
};

/* ======================= CHECK IN BOOKING (ADMIN) ======================= */

export const checkInBooking = async (id: string) => {
  const res = await apiClient.patch(`/bookings/${id}/check-in`);

  return res.data;
};

/* ======================= CHECK OUT BOOKING (ADMIN) ======================= */

export const checkOutBooking = async (id: string) => {
  const res = await apiClient.patch(`/bookings/${id}/check-out`);

  return res.data;
};
