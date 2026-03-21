import { useEffect, useState } from "react";
import type { Review, ReviewAverage } from "../../types/review.types";
import {
  createReview,
  deleteReview,
  getReviewAverage,
  getReviewsByRoom,
} from "../../common/services/reviewService";

export const useReviews = (roomId: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [average, setAverage] = useState<ReviewAverage | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const [reviewRes, avgRes] = await Promise.all([
        getReviewsByRoom(roomId),
        getReviewAverage(roomId),
      ]);
      setReviews(reviewRes);
      setAverage(avgRes);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: any) => {
    await createReview(data);
    await fetchReviews();
  };

  const handleDelete = async (id: string) => {
    await deleteReview(id);
    await fetchReviews();
  };

  useEffect(() => {
    if (roomId) fetchReviews();
  }, [roomId]);

  return {
    reviews,
    average,
    loading,
    handleCreate,
    handleDelete,
  };
};
