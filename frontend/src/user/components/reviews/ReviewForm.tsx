import React, { useState } from "react";
import { Star, Send, X } from "lucide-react";

interface Props {
  roomId: string;
  initialReview?: any;
  onSubmit: (data: { rating: number; comment: string }) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export const ReviewForm: React.FC<Props> = ({
  initialReview,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [rating, setRating] = useState(initialReview?.rating || 5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState(initialReview?.comment || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    await onSubmit({ rating, comment });
    if (!initialReview) {
      setRating(5);
      setComment("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          {initialReview ? "Chỉnh sửa đánh giá" : "Viết đánh giá của bạn"}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Rating */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Xếp hạng của bạn
        </label>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= (hoveredRating || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-200 fill-transparent"
                } transition-colors`}
              />
            </button>
          ))}
          <span className="ml-3 text-sm font-semibold text-emerald-600">
            {rating}/5 sao
          </span>
        </div>
      </div>

      {/* Comment */}
      <div className="mb-6">
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Nhận xét của bạn
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Chia sẻ trải nghiệm của bạn về căn phòng này..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all resize-none text-sm outline-none"
          required
        />
      </div>

      {/* Buttons */}
      <button
        type="submit"
        disabled={isSubmitting || rating === 0}
        className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-emerald-200"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Send className="w-4 h-4" />
            {initialReview ? "Cập nhật đánh giá" : "Gửi đánh giá"}
          </>
        )}
      </button>
    </form>
  );
};
