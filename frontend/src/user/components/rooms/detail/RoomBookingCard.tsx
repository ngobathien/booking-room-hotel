import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShieldCheck, Users, ArrowRight } from "lucide-react";
import type { Room } from "../../../../types/room.types";

import { useBooking } from "../../../../context/BookingContext";
import { useBookingAction } from "../../../../hooks/useBookingAction";
import { useRoomContext } from "../../../../context/RoomContext";

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
  } = useBooking();

  const location = useLocation();
  const { filterParams } = useRoomContext();
  const { handleCheckRoomAvailability } = useBookingAction();

  const calculateNights = (start: string, end: string) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    const diff = e.getTime() - s.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const nights = calculateNights(checkInDate, checkOutDate);
  const isValidDates = nights > 0;

  // nếu đã có filter params từ search thì set luôn vào state để
  // hiển thị lên UI room booking card,

  useEffect(() => {
    if (filterParams.checkInDate && filterParams.checkOutDate) {
      setCheckInDate(filterParams.checkInDate || "");
      setCheckOutDate(filterParams.checkOutDate || "");
    }
  }, [filterParams.checkInDate, filterParams.checkOutDate]);

  // khi ngày checkin checkout thay đổi thì kiểm tra lại phòng có còn trống hay không
  useEffect(() => {
    if (isValidDates) {
      handleCheckRoomAvailability(room._id);
    }
  }, [checkInDate, checkOutDate, room._id]);

  //
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
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isValidDates
                    ? "max-h-[600px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
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

                <Link
                  // to={`/checkout/${room._id}${location.search}`}
                  to={`/checkout/${room._id}?checkIn=${checkInDate}&checkOut=${checkOutDate}&guests=${filterParams.guests || 1}`}
                  className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-lg font-black shadow-xl transition-all
                    ${
                      available
                        ? "bg-primary text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                    }`}
                >
                  Đặt phòng ngay <ArrowRight className="h-5 w-5" />
                </Link>
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
