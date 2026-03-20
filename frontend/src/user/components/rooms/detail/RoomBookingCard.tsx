import {
  ArrowRight,
  Loader2,
  ShieldCheck,
  ShoppingBag,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Room } from "../../../../types/room.types";

import { useBookingAction } from "../../../../hooks/booking/useBookingAction";
import { useAuth } from "../../../../hooks/auth/useAuth";
import { useBooking } from "../../../../hooks/booking/useBooking";
import { useRoomContext } from "../../../../hooks/room/useRoom";

interface Props {
  room: Room;
}

const RoomBookingCard: React.FC<Props> = ({ room }) => {
  const {
    checkInDate,
    checkOutDate,
    setCheckInDate,
    setCheckOutDate,
    available,
    loading,
    addRoom,
  } = useBooking();

  const navigate = useNavigate();
  const { user } = useAuth();
  const { filterParams } = useRoomContext();
  const { handleCheckRoomAvailability } = useBookingAction();

  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  // Tính số đêm
  const calculateNights = (start: string, end: string) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    const diff = e.getTime() - s.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };
  const nights = calculateNights(checkInDate, checkOutDate);
  const isValidDates = nights > 0;

  // Nếu đã có filter params từ search thì set luôn
  useEffect(() => {
    if (filterParams.checkInDate && filterParams.checkOutDate) {
      setCheckInDate(filterParams.checkInDate || "");
      setCheckOutDate(filterParams.checkOutDate || "");
    }
  }, [filterParams.checkInDate, filterParams.checkOutDate]);

  // Khi ngày checkin checkout thay đổi, kiểm tra phòng
  useEffect(() => {
    if (isValidDates) {
      handleCheckRoomAvailability(room._id);
    }
  }, [checkInDate, checkOutDate, room._id]);

  // Thêm phòng vào giỏ
  const handleAddToCart = async () => {
    if (!room) return;

    if (!isValidDates) {
      setAvailabilityMessage({
        type: "info",
        text: "Vui lòng chọn ngày nhận và trả phòng trước.",
      });
      return;
    }

    if (available === false) {
      setAvailabilityMessage({
        type: "error",
        text: "Phòng đã được đặt.",
      });
      return;
    }

    if (available === null) {
      setAvailabilityMessage({
        type: "info",
        text: "Đang kiểm tra phòng...",
      });
      return;
    }

    addRoom(room);

    setAvailabilityMessage({
      type: "success",
      text: "Đã thêm phòng vào đơn hàng!",
    });
  };

  // Đặt phòng ngay
  const handleBookingWithAuth = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Chuyển sang dùng query params thay vì path params
    navigate(
      `/checkout?rooms=${room._id}&checkIn=${checkInDate}&checkOut=${checkOutDate}&guests=${
        filterParams.guests || 1
      }`,
    );
  };

  return (
    <aside className="relative">
      <div className="sticky top-24 space-y-6">
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100">
          {/* Header giá */}
          <div className="bg-primary p-6 text-white">
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/70">
              Giá mỗi đêm
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-3xl font-black">
                {room.roomType.pricePerNight.toLocaleString()}
              </span>
              <span className="text-sm font-bold">VNĐ</span>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Date picker */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Ngày nhận
                  </label>
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <input
                      type="date"
                      className="w-full bg-transparent text-sm font-bold outline-none cursor-pointer"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Ngày trả
                  </label>
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <input
                      type="date"
                      className="w-full bg-transparent text-sm font-bold outline-none cursor-pointer"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      min={
                        checkInDate || new Date().toISOString().split("T")[0]
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            {loading && (
              <div className="text-sm text-slate-500">
                Đang kiểm tra phòng...
              </div>
            )}
            {!loading && available === true && (
              <div className="text-sm font-semibold text-green-600">
                ✅ Phòng còn trống
              </div>
            )}
            {!loading && available === false && (
              <div className="text-sm font-semibold text-red-600">
                ❌ Phòng đã được đặt
              </div>
            )}

            {/* Price summary */}
            {isValidDates ? (
              <div className="transition-all duration-500 ease-in-out overflow-hidden max-h-[600px] opacity-100">
                <div className="space-y-3 border-t border-dashed border-slate-100 pt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">
                      Giá phòng ({nights} đêm)
                    </span>
                    <span className="font-bold">
                      {(room.roomType.pricePerNight * nights).toLocaleString()}{" "}
                      VNĐ
                    </span>
                  </div>

                  <div className="flex justify-between pt-2 text-xl font-black">
                    <span>Tổng cộng</span>
                    <span className="text-primary">
                      {(room.roomType.pricePerNight * nights).toLocaleString()}{" "}
                      VNĐ
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid gap-3 mt-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={isCheckingAvailability}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white border-2 border-primary py-4 text-lg font-black text-primary transition-all hover:bg-primary/5 disabled:opacity-50"
                  >
                    {isCheckingAvailability ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" /> Đang kiểm
                        tra...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-5 w-5" /> Thêm vào đơn hàng
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleBookingWithAuth}
                    className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-lg font-black shadow-xl transition-all ${
                      available
                        ? "bg-primary text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!available}
                  >
                    Đặt phòng ngay <ArrowRight className="h-5 w-5" />
                  </button>

                  {/* Availability message */}
                  {availabilityMessage && (
                    <div
                      className={`text-sm mt-2 text-center ${
                        availabilityMessage.type === "success"
                          ? "text-green-600"
                          : availabilityMessage.type === "error"
                            ? "text-red-600"
                            : "text-amber-600"
                      }`}
                    >
                      {availabilityMessage.text}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-amber-50 p-4 border border-amber-100">
                <p className="text-xs font-medium text-amber-700 text-center">
                  Vui lòng chọn ngày hợp lệ để xem giá và đặt phòng.
                </p>
              </div>
            )}

            <p className="text-center text-[10px] leading-relaxed text-slate-400">
              Bạn chưa bị trừ tiền lúc này. Quy trình thanh toán sẽ được thực
              hiện tại bước tiếp theo.
            </p>
          </div>
        </div>

        {/* Security info */}
        <div className="space-y-3 px-2">
          <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            Thanh toán bảo mật SSL 256-bit
          </div>
          <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
            <Users className="h-5 w-5 text-primary" />
            Hỗ trợ khách hàng 24/7
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RoomBookingCard;
