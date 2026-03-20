import type { CreateReviewPayload } from "../../types/review.types";
import apiClient from "./apiClient";

// tạo / update
export const createReview = async (payload: CreateReviewPayload) => {
  const res = await apiClient.post("/reviews", payload);
  return res.data;
};

// lấy review theo room
export const getReviewsByRoom = async (roomId: string) => {
  const res = await apiClient.get(`/reviews/room/${roomId}`);
  return res.data;
};

// lấy tất cả review (admin)
export const getAllReviews = async () => {
  const res = await apiClient.get("/reviews"); // backend /reviews, admin only
  return res.data;
};

// lấy average
export const getReviewAverage = async (roomId: string) => {
  const res = await apiClient.get(`/reviews/room/${roomId}/average`);
  return res.data;
};

// delete
export const deleteReview = async (id: string) => {
  const res = await apiClient.delete(`/reviews/${id}`);
  return res.data;
};
