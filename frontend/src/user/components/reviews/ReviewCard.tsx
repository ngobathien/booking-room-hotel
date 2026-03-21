import React from "react";
import { Star, Edit2, Trash2, User } from "lucide-react";
import { format } from "date-fns";
import type { Review } from "../../../types/review.types";
import { formatDateVN } from "../../../utils/formatDateVN";

interface Props {
  review: Review;
  onEdit?: (review: Review) => void;
  onDelete?: (id: string) => void;
  isOwner?: boolean;
}

export const ReviewCard: React.FC<Props> = ({
  review,
  onEdit,
  onDelete,
  isOwner,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
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

          {/* User Info */}
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

      {/* Owner Actions */}
      {isOwner && (
        <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
          <button
            onClick={() => onEdit?.(review)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-emerald-600 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            Sửa
          </button>
          <button
            onClick={() => onDelete?.(review._id)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Xóa
          </button>
        </div>
      )}
    </div>
  );
};
