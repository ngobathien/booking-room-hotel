import React, { useState } from "react";
import { MessageSquare, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";
import { useReviews } from "../../../hooks/review/useReviews";
import { useUsers } from "../../../hooks/user/useUser";
import { cn } from "../../../lib/utils";
import { useAuth } from "../../../hooks/auth/useAuth";

interface Props {
  roomId: string;
}

export const RoomReviews: React.FC<Props> = ({ roomId }) => {
  const { reviews, average, loading, handleCreate, handleDelete } =
    useReviews(roomId);

  const { currentUser } = useUsers();
  const { user } = useAuth();
  console.log("Current User:", currentUser);
  console.log(" User:", user);
  const [isReviewing, setIsReviewing] = useState(false);
  const [editingReview, setEditingReview] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: { rating: number; comment: string }) => {
    setIsSubmitting(true);
    try {
      await handleCreate({
        roomId,
        rating: data.rating,
        comment: data.comment,
      });

      setIsReviewing(false);
      setEditingReview(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Đang tải đánh giá...</p>;

  const avg =
    average?.avgRating ||
    (reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0);

  return (
    <div className="space-y-8 pt-12 border-t border-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6 text-emerald-600" />
          <h3 className="text-2xl font-black text-slate-900">
            Đánh giá từ khách hàng
          </h3>
          <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">
            {reviews.length}
          </span>
        </div>

        {!isReviewing && (
          <button
            onClick={() => setIsReviewing(true)}
            className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            + Viết đánh giá
          </button>
        )}
      </div>

      {/* Rating Summary */}
      {reviews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50/50 p-8 rounded-[32px] border border-slate-100">
          {/* Left */}
          <div className="md:col-span-4 text-center md:border-r border-slate-200 md:pr-8">
            <div className="text-6xl font-black text-slate-900">
              {avg.toFixed(1)}
            </div>

            <div className="mt-2 flex justify-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5 fill-current",
                    i < Math.round(avg) ? "text-amber-400" : "text-slate-200",
                  )}
                />
              ))}
            </div>

            <div className="mt-2 text-sm font-bold text-slate-500 uppercase tracking-widest">
              {reviews.length} đánh giá
            </div>
          </div>

          {/* Right */}
          <div className="md:col-span-8 space-y-3">
            {/* dạng phần trăm */}
            {/* {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => r.rating === star).length;
              const percentage =
                reviews.length > 0 ? (count / reviews.length) * 100 : 0;

              return (
                <div key={star} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-12 shrink-0">
                    <span className="text-sm font-bold text-slate-600">
                      {star}
                    </span>
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  </div>

                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-amber-400 rounded-full"
                    />
                  </div>

                  <div className="w-10 text-right">
                    <span className="text-xs font-bold text-slate-400">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                </div>
              );
            })} */}

            {/* dạng số  */}
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => r.rating === star).length;

              return (
                <div key={star} className="flex items-center gap-4">
                  {/* Số sao */}
                  <div className="flex items-center gap-1 w-12 shrink-0">
                    <span className="text-sm font-bold text-slate-600">
                      {star}
                    </span>
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  </div>

                  {/* Thanh hiển thị (tỉ lệ so với tổng) */}
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / reviews.length) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-amber-400 rounded-full"
                    />
                  </div>

                  {/* Hiển thị tổng số đánh giá thay vì % */}
                  <div className="w-10 text-right">
                    <span className="text-xs font-bold text-slate-400">
                      {count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Form */}
      <AnimatePresence>
        {isReviewing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <ReviewForm
              roomId={roomId}
              initialReview={editingReview || undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsReviewing(false);
                setEditingReview(null);
              }}
              isSubmitting={isSubmitting}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* List */}
      <div className="grid gap-6">
        {reviews.length > 0 ? (
          reviews.map((r) => (
            <ReviewCard
              key={r._id}
              review={r}
              isOwner={r.userId?._id === user?._id}
              onDelete={handleDelete}
              onEdit={(review) => {
                setEditingReview(review);
                setIsReviewing(true);
              }}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-500 font-medium">
              Chưa có đánh giá nào cho phòng này.
            </p>
            <button
              onClick={() => setIsReviewing(true)}
              className="mt-2 text-sm font-bold text-emerald-600 hover:underline"
            >
              Hãy là người đầu tiên đánh giá!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
