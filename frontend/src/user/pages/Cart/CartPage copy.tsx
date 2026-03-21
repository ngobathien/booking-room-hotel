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

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/auth/useAuth";
import { useBooking } from "../../../hooks/booking/useBooking";
import { toast } from "react-toastify";

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
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 pt-10 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex justify-between mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex gap-2 text-sm font-bold text-slate-400 hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" /> Quay lại
            </button>

            <Link
              to="/rooms"
              className="flex items-center gap-1 text-primary font-bold"
            >
              Tiếp tục chọn phòng <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex justify-between">
            <div>
              <h1 className="text-4xl font-black">Giỏ hàng của bạn</h1>
              <p className="text-slate-500">
                Bạn đã chọn{" "}
                <span className="text-primary font-bold">
                  {selectedRooms.length}
                </span>{" "}
                phòng
              </p>
            </div>

            {selectedRooms.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm("Xóa tất cả phòng?")) clearRooms();
                }}
                className="text-red-500"
              >
                <Trash2 />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 -mt-8">
        {selectedRooms.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Rooms */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {selectedRooms.map((item) => {
                  const room = item.room;

                  return (
                    <motion.div
                      key={room._id}
                      layout
                      className="bg-white p-6 rounded-3xl shadow"
                    >
                      <img
                        src={room.images[0]}
                        className="h-60 w-full object-cover rounded-xl"
                      />

                      <h3 className="text-xl font-bold mt-4">
                        Phòng {room.roomNumber}
                      </h3>

                      <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                        <div className="flex gap-2">
                          <Users className="h-4 w-4" />
                          {room.roomType.capacity}
                        </div>
                        <div className="flex gap-2">
                          <Bed className="h-4 w-4" />
                          {room.bedType}
                        </div>
                        <div className="flex gap-2">
                          <Eye className="h-4 w-4" />
                          {room.view}
                        </div>
                      </div>

                      <p className="mt-3 text-primary font-bold">
                        {room.roomType.pricePerNight.toLocaleString()}đ x{" "}
                        {nights} đêm
                      </p>

                      <div className="flex justify-between mt-4">
                        <Link
                          to={`/rooms/${room._id}/room-${room.roomNumber}${location.search}`}
                        >
                          Chỉnh sửa
                        </Link>

                        <button onClick={() => removeRoom(room._id)}>
                          <Trash2 />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div>
              <div className="bg-white p-6 rounded-3xl shadow sticky top-24">
                {selectedRooms.map((item) => {
                  const room = item.room;

                  return (
                    <div
                      key={room._id}
                      className="flex justify-between text-sm"
                    >
                      <span>Phòng {room.roomNumber}</span>
                      <span>
                        {(
                          room.roomType.pricePerNight * nights
                        ).toLocaleString()}
                        đ
                      </span>
                    </div>
                  );
                })}

                <div className="mt-4 font-bold flex justify-between">
                  <span>Tổng</span>
                  <span>{totalPrice.toLocaleString()}đ</span>
                </div>

                <button
                  onClick={handleBookingWithAuth}
                  className="w-full mt-6 bg-primary text-white py-3 rounded-xl flex justify-center gap-2"
                >
                  <CreditCard /> Thanh toán
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <ShoppingBag className="mx-auto mb-4" />
            <h2>Giỏ hàng trống</h2>
          </div>
        )}
      </div>
    </div>
  );
};
