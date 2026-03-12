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
