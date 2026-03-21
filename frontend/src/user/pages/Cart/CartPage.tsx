import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  CreditCard,
  MapPin,
  Users,
  Maximize,
  Bed,
  Eye,
  ChevronLeft,
  ShieldCheck,
  Headphones,
  Calendar,
  Info,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/auth/useAuth";
import { useBooking } from "../../../hooks/booking/useBooking";

export const CartPage = () => {
  const {
    selectedRooms,
    removeRoom,
    totalPrice,
    clearRooms,
    checkInDate,
    checkOutDate,
  } = useBooking();

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const getNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const inDate = new Date(checkInDate);
    const outDate = new Date(checkOutDate);
    return Math.ceil(
      (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24),
    );
  };

  const nights = getNights();

  const handleBookingWithAuth = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (selectedRooms.length === 0) {
      toast.error("Bạn chưa chọn phòng nào!");
      return;
    }

    if (!checkInDate || !checkOutDate) {
      toast.error("Vui lòng chọn ngày nhận và trả phòng.");
      return;
    }

    const roomIds = selectedRooms.map((r) => r.room._id).join(",");

    navigate(
      `/checkout?rooms=${encodeURIComponent(
        roomIds,
      )}&checkIn=${checkInDate}&checkOut=${checkOutDate}&guests=1`,
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 font-sans">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 pt-10 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Quay lại
            </button>
            <Link
              to="/rooms"
              className="text-sm font-bold text-primary hover:underline flex items-center gap-1"
            >
              Tiếp tục chọn phòng <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">
                Giỏ hàng của bạn
              </h1>
              <p className="mt-2 text-lg font-medium text-slate-500">
                Bạn đã chọn{" "}
                <span className="text-primary font-bold">
                  {selectedRooms.length}
                </span>{" "}
                không gian nghỉ dưỡng tuyệt vời.
              </p>
            </div>
            {selectedRooms.length > 0 && (
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Bạn có chắc chắn muốn xóa tất cả phòng khỏi giỏ hàng?",
                    )
                  ) {
                    clearRooms();
                  }
                }}
                className="flex items-center gap-2 text-sm font-bold text-red-400 hover:text-red-600 transition-colors bg-red-50 px-4 py-2 rounded-xl"
              >
                <Trash2 className="h-4 w-4" /> Xóa tất cả
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8">
        {selectedRooms.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* List of Rooms */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="popLayout">
                {selectedRooms.map((item) => {
                  const room = item.room;
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, x: -20 }}
                      key={room._id}
                      className="group relative overflow-hidden rounded-[32px] bg-white shadow-sm border border-slate-100 flex flex-col md:flex-row transition-all hover:shadow-xl hover:shadow-slate-200/50"
                    >
                      {/* Image Section */}
                      <div className="relative w-full md:w-80 h-64 md:h-auto overflow-hidden shrink-0">
                        <img
                          src={room.images[0]}
                          alt={room.roomNumber}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-4 left-4">
                          <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-900 border border-white/30 shadow-sm">
                            Phòng #{room.roomNumber}
                          </span>
                        </div>
                      </div>

                      {/* Details Section */}
                      <div className="flex-1 p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors">
                                {room.roomType.roomTypeName}
                              </h3>
                              <div className="mt-2 flex items-center gap-2 text-xs font-bold text-slate-400">
                                <MapPin className="h-3 w-3" /> Tầng {room.floor}{" "}
                                • Luxury Hotel
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-black text-primary">
                                {room.roomType.pricePerNight.toLocaleString()}đ
                              </div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Mỗi đêm
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                              <Maximize className="h-4 w-4 text-primary/60" />
                              <span>{room.roomType.roomSize} m²</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                              <Users className="h-4 w-4 text-primary/60" />
                              <span>{room.roomType.capacity} Khách</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                              <Bed className="h-4 w-4 text-primary/60" />
                              <span>{room.bedType}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                              <Eye className="h-4 w-4 text-primary/60" />
                              <span>{room.view}</span>
                            </div>
                          </div>

                          <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                              <Calendar className="h-3 w-3" /> Thời gian lưu trú
                            </div>
                            <p className="text-sm font-bold text-slate-700">
                              {nights > 0
                                ? `${nights} đêm (Từ ${new Date(checkInDate).toLocaleDateString("vi-VN")} đến ${new Date(checkOutDate).toLocaleDateString("vi-VN")})`
                                : "Vui lòng chọn ngày để tính giá chính xác."}
                            </p>
                          </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-50">
                          <Link
                            to={`/rooms/${room._id}/room-${room.roomNumber}${location.search}`}
                            className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-black"
                          >
                            Chỉnh sửa <ArrowRight className="h-3 w-3" />
                          </Link>
                          <button
                            onClick={() => removeRoom(room._id)}
                            className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
                          >
                            <Trash2 className="h-4 w-4" /> Loại bỏ
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                <div className="flex items-center gap-4 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Bảo mật 100%
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Thanh toán an toàn
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Headphones className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Hỗ trợ 24/7
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Luôn sẵn sàng giúp đỡ
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
                  <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                    <Info className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Giá tốt nhất
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Cam kết không ẩn phí
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="overflow-hidden rounded-[32px] bg-white shadow-2xl border border-slate-100">
                  <div className="bg-slate-900 p-8 text-white">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold">Tóm tắt đơn hàng</h3>
                      <ShoppingBag className="h-5 w-5 text-white/30" />
                    </div>
                    <p className="text-xs text-white/50 mt-1">
                      Vui lòng kiểm tra kỹ trước khi thanh toán
                    </p>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {selectedRooms.map((item) => (
                        <div
                          key={item.room._id}
                          className="flex justify-between text-sm group"
                        >
                          <span className="text-slate-500 truncate max-w-[150px] group-hover:text-slate-900 transition-colors">
                            Phòng {item.room.roomNumber}
                          </span>
                          <span className="font-bold text-slate-900">
                            {(
                              item.room.roomType.pricePerNight * (nights || 1)
                            ).toLocaleString()}
                            đ
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 border-t border-dashed border-slate-100 pt-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Số đêm nghỉ</span>
                        <span className="font-bold text-slate-900">
                          {nights} đêm
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Thuế & Phí (10%)</span>
                        <span className="font-bold text-emerald-600">
                          Miễn phí
                        </span>
                      </div>
                      <div className="flex justify-between pt-4 text-2xl font-black">
                        <span>Tổng cộng</span>
                        <span className="text-primary">
                          {totalPrice.toLocaleString()}đ
                        </span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={handleBookingWithAuth}
                        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-5 text-lg font-black text-white shadow-xl shadow-primary/30 transition-all hover:bg-blue-700 active:scale-[0.98]"
                      >
                        <CreditCard className="h-5 w-5" /> Thanh toán ngay
                      </button>
                      <p className="mt-4 text-center text-[10px] leading-relaxed text-slate-400">
                        Bằng cách nhấn thanh toán, bạn đồng ý với các{" "}
                        <span className="underline cursor-pointer">
                          Điều khoản & Chính sách
                        </span>{" "}
                        của chúng tôi.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[32px] bg-emerald-50 p-6 border border-emerald-100">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
                      <ShoppingBag className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-emerald-900">
                        Ưu đãi đặc biệt
                      </h4>
                      <p className="mt-1 text-xs text-emerald-700 leading-relaxed">
                        Bạn đang được hưởng ưu đãi miễn phí thuế và phí dịch vụ
                        cho các đặt phòng trong tháng này.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center bg-white rounded-[40px] border border-slate-100 shadow-sm p-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-slate-50 text-slate-200"
            >
              <ShoppingBag className="h-16 w-16" />
            </motion.div>
            <h2 className="text-3xl font-black text-slate-900 uppercase">
              Giỏ hàng của bạn đang trống
            </h2>
            <p className="mt-4 max-w-md text-lg font-medium text-slate-500">
              Có vẻ như bạn chưa chọn được không gian ưng ý. Hãy để chúng tôi
              giúp bạn tìm thấy căn phòng hoàn hảo nhất.
            </p>
            <Link
              to="/rooms"
              className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-10 py-5 text-lg font-black text-white shadow-xl shadow-slate-200 transition-all hover:bg-black active:scale-95"
            >
              Khám phá phòng ngay <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
