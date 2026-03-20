import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Home,
  User,
  Download,
  Calendar,
  CreditCard,
  Bed,
} from "lucide-react";

import { getBookingById } from "../../../common/services/bookingService";
import { useBooking } from "../../../hooks/booking/useBooking";

export const PaymentResultPage = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const status = searchParams.get("status");

  const isSuccess = status === "success";

  // Sử dụng state cục bộ để quản lý dữ liệu Booking theo cấu trúc mới
  const [bookingData, setBookingData] = useState<any>(null);
  const { setLoading, loading } = useBooking();

  useEffect(() => {
    if (!bookingId) return;

    const fetchBooking = async () => {
      setLoading(true);
      try {
        const response = await getBookingById(bookingId);
        // Dựa trên JSON bạn gửi: { booking: {...}, items: [...] }
        // Lưu ý: Nếu service trả về mảng [ {booking, items} ], hãy dùng response[0]
        setBookingData(Array.isArray(response) ? response[0] : response);
      } catch (error) {
        console.error("Fetch booking failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, setLoading]);

  // Truy cập an toàn vào các thuộc tính
  const bookingInfo = bookingData?.booking;
  const bookingItems = bookingData?.items || [];

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50/50">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/60 border border-slate-100 text-center">
          {/* Status Icon */}
          <div
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-8 ${
              isSuccess
                ? "bg-green-50 text-green-500"
                : "bg-red-50 text-red-500"
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="w-12 h-12" />
            ) : (
              <XCircle className="w-12 h-12" />
            )}
          </div>

          {/* Title & Description */}
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            {isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại!"}
          </h1>

          <p className="text-slate-500 mb-10 max-w-md mx-auto">
            {isSuccess
              ? "Tuyệt vời! Đặt phòng của bạn đã được xác nhận thành công. Chúng tôi đã gửi chi tiết hóa đơn vào email của bạn."
              : "Rất tiếc, đã có lỗi xảy ra trong quá trình xử lý giao dịch. Vui lòng kiểm tra lại phương thức thanh toán."}
          </p>

          {/* Booking Details Card (Chỉ hiển thị khi thành công và có dữ liệu) */}
          {isSuccess && bookingInfo && (
            <div className="bg-slate-50 rounded-[2rem] p-6 md:p-8 mb-10 text-left border border-slate-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <CreditCard className="w-24 h-24" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {/* Cột trái: Mã & Danh sách phòng */}
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-1">
                      <div className="w-1 h-1 bg-primary rounded-full" /> Mã đặt
                      phòng
                    </label>
                    <div className="text-xl font-black text-primary font-mono tracking-tight">
                      {bookingInfo.bookingCode}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-3">
                      <Bed className="w-3 h-3" /> Danh sách phòng (
                      {bookingItems.length})
                    </label>
                    <div className="space-y-3">
                      {bookingItems.map((item: any) => (
                        <div
                          key={item._id}
                          className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm"
                        >
                          <img
                            src={
                              item.room?.thumbnail || "/placeholder-room.jpg"
                            }
                            alt="Room"
                            className="w-12 h-12 rounded-xl object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-slate-900 truncate">
                              Phòng {item.room?.roomNumber}
                            </div>
                            <div className="text-[10px] text-slate-500 font-bold uppercase">
                              {item.price?.toLocaleString()}đ / đêm
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cột phải: Thời gian & Tổng tiền */}
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-2">
                      <Calendar className="w-3 h-3" /> Lịch trình lưu trú
                    </label>
                    <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl border border-slate-100 w-fit">
                      <span className="text-sm font-bold text-slate-700">
                        {new Date(bookingInfo.checkInDate).toLocaleDateString(
                          "vi-VN",
                        )}
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-300" />
                      <span className="text-sm font-bold text-slate-700">
                        {new Date(bookingInfo.checkOutDate).toLocaleDateString(
                          "vi-VN",
                        )}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-1">
                      <div className="w-1 h-1 bg-green-500 rounded-full" /> Tổng
                      thanh toán
                    </label>
                    <div className="text-3xl font-black text-slate-900">
                      {bookingInfo.totalPrice?.toLocaleString()}{" "}
                      <span className="text-sm font-bold text-slate-400">
                        VNĐ
                      </span>
                    </div>
                    <div className="mt-1 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                      Đã thanh toán trực tuyến
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
              className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 px-6 font-bold text-white shadow-xl hover:bg-black transition-all active:scale-95"
            >
              <User className="w-5 h-5" /> Quản lý đặt phòng
            </Link>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 rounded-2xl bg-white border-2 border-slate-100 py-4 px-6 font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-95"
            >
              <Home className="w-5 h-5" /> Về trang chủ
            </Link>
          </div>

          {isSuccess && (
            <button className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest">
              <Download className="w-4 h-4" /> Tải hóa đơn xác nhận (PDF)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
