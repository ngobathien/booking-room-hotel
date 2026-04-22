import { Edit2, Star, Trash2, User } from "lucide-react";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router";
import {
  deleteReview,
  getAllReviews,
} from "../../../common/services/reviewService";
import { useAuth } from "../../../hooks/auth/useAuth";
import type { Review } from "../../../types/review.types";
import { formatDateVN } from "../../../utils/formatDateVN";

const ReviewManagement = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Nếu user không phải admin, redirect hoặc hiển thị thông báo
  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      navigate("/"); // hoặc trang 403
    }
  }, [user]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      if (!user || user.role !== "ADMIN") return;
      const res = await getAllReviews();
      setReviews(res || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa review này không?")) return;
    try {
      await deleteReview(id);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (review: Review) => {
    console.log("Edit review", review);
    // có thể mở modal hoặc navigate tới form edit
  };

  if (!user || user.role !== "ADMIN") {
    return (
      <p className="p-6 text-red-600">Bạn không có quyền truy cập trang này.</p>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Quản lý đánh giá</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : reviews.length === 0 ? (
        <p>Chưa có đánh giá nào.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center overflow-hidden border border-emerald-100">
                    {review.userId?.avatar ? (
                      <img
                        src={review.userId.avatar}
                        alt={review.userId?.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-emerald-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {review.userId?.fullName || "Người dùng"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDateVN(review.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-bold text-amber-700">
                    {review.rating}
                  </span>
                </div>
              </div>

              {/* Comment */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {review.comment}
              </p>

              {/* Admin Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <button
                  onClick={() => handleEdit(review)}
                  className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-emerald-600 transition-colors"
                >
                  {/* <Edit2 className="w-3.5 h-3.5" /> Sửa */}
                </button>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewManagement;
