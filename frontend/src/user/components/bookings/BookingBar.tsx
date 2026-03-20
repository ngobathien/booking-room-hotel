import React, { useState } from "react";

import { useNavigate } from "react-router";
import { useBooking } from "../../../hooks/booking/useBooking";
import { useRoomTypesAction } from "../../../hooks/roomTypes/useRoomTypesAction";

const BookingBar: React.FC = () => {
  const { available, loading } = useBooking();
  const navigate = useNavigate();
  const { roomTypes } = useRoomTypesAction();

  const today = new Date().toISOString().split("T")[0];

  const [searchParams, setSearchParams] = useState({
    checkIn: "",
    checkOut: "",
    guests: "",
  });

  const handleSearch = () => {
    const params = new URLSearchParams({
      checkInDate: searchParams.checkIn,
      checkOutDate: searchParams.checkOut,
      guests: searchParams.guests.toString(),
    });

    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <div className="relative z-20 -mt-16 max-w-[1000px] mx-auto px-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-end border border-gray-100">
        {/* Check-In */}
        <div className="flex-1 w-full space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
            Nhận phòng
          </label>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              calendar_today
            </span>

            <input
              value={searchParams.checkIn}
              min={today}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="Chọn ngày"
              type="text"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) =>
                (e.target.type = searchParams.checkIn ? "date" : "text")
              }
              onChange={(e) =>
                setSearchParams({ ...searchParams, checkIn: e.target.value })
              }
            />
          </div>
        </div>

        {/* Check-Out */}
        <div className="flex-1 w-full space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
            Trả phòng
          </label>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              calendar_month
            </span>

            <input
              value={searchParams.checkOut}
              min={searchParams.checkIn || today}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="Chọn ngày"
              type="text"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) =>
                (e.target.type = searchParams.checkOut ? "date" : "text")
              }
              onChange={(e) =>
                setSearchParams({ ...searchParams, checkOut: e.target.value })
              }
            />
          </div>
        </div>

        {/* Guests */}
        <div className="flex-1 w-full space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
            Số khách
          </label>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              group
            </span>

            <input
              type="number"
              value={searchParams.guests}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  guests: e.target.value,
                })
              }
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full md:w-auto h-12 px-8 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-60"
        >
          <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">
            search
          </span>
          {loading ? "Đang kiểm tra..." : "Tìm phòng"}
        </button>
      </div>

      {/* Availability Result */}
      {available !== null && (
        <div className="mt-4 text-center">
          {available ? (
            <p className="text-green-600 font-semibold">✅ Phòng còn trống</p>
          ) : (
            <p className="text-red-600 font-semibold">
              ❌ Hết phòng trong khoảng thời gian này
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingBar;
