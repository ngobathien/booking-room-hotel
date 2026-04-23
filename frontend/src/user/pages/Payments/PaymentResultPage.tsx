import React from "react";
import { Link, useSearchParams } from "react-router-dom";

import { ArrowRight, CheckCircle2, Home, User } from "lucide-react";

import { getBookingById } from "../../../common/services/bookingService";
import { useBooking } from "../../../hooks/booking/useBooking";
import { formatVND } from "../../../lib/utils";

export const PaymentResultPage = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const status = searchParams.get("status");

  const isSuccess = status === "success";

  const { currentBooking, setCurrentBooking } = useBooking();

  React.useEffect(() => {
    if (!bookingId) return;

    const fetchBooking = async () => {
      try {
        const booking = await getBookingById(bookingId);
        setCurrentBooking(booking);
      } catch (error) {
        console.error("Fetch booking failed", error);
      }
    };

    fetchBooking();
  }, [bookingId]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50/50">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/60 border border-slate-100 text-center">
          {/* Success Icon */}
          <div
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-8
  ${isSuccess ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"}
`}
          >
            <CheckCircle2 className="w-12 h-12" />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            {isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại!"}
          </h1>

          <p className="text-slate-500 mb-10">
            {isSuccess
              ? "Đặt phòng của bạn đã được xác nhận. Thông tin xác nhận đã được gửi đến email của bạn."
              : "Thanh toán không thành công. Vui lòng thử lại."}
          </p>

          {/* Booking Summary Card */}
          {currentBooking && (
            <div className="bg-slate-50 rounded-3xl p-6 md:p-8 mb-10 text-left border border-slate-100">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Mã đặt phòng
                    </label>
                    <div className="text-lg font-black text-primary">
                      {currentBooking.bookingCode}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Phòng
                    </label>
                    <div className="font-bold text-slate-900">
                      {currentBooking.room.roomNumber}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Thời gian lưu trú
                    </label>

                    <div className="flex items-center gap-3 mt-1">
                      <div className="text-sm font-bold">
                        {new Date(
                          currentBooking.checkInDate,
                        ).toLocaleDateString()}
                      </div>

                      <ArrowRight className="w-3 h-3 text-slate-300" />

                      <div className="text-sm font-bold">
                        {new Date(
                          currentBooking.checkOutDate,
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Tổng thanh toán
                    </label>

                    <div className="text-lg font-black text-slate-900">
                      {formatVND(currentBooking.totalPrice)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/my-bookings"
              className="flex items-center justify-center gap-2 rounded-2xl bg-primary py-4 px-6 font-bold text-white shadow-xl shadow-primary/30 hover:bg-blue-700 transition-all"
            >
              <User className="w-5 h-5" /> Xem đơn đặt phòng
            </Link>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 rounded-2xl bg-white border border-slate-200 py-4 px-6 font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              <Home className="w-5 h-5" /> Về trang chủ
            </Link>
          </div>

          {/* <button className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors">
            <Download className="w-4 h-4" /> Tải hóa đơn (PDF)
          </button> */}
        </div>
      </div>
    </div>
  );
};
