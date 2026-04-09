import React, { useState } from "react";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useBooking } from "../../../hooks/booking/useBooking";

const BookingBar: React.FC = () => {
  const { available, loading } = useBooking();
  const navigate = useNavigate();

  // STATE dùng Date (chuẩn)
  const [searchParams, setSearchParams] = useState({
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    guests: "",
  });

  // format Date → yyyy-MM-dd (gửi API)
  const formatISO = (date: Date | null) => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const handleSearch = () => {
    const params = new URLSearchParams({
      checkInDate: formatISO(searchParams.checkIn),
      checkOutDate: formatISO(searchParams.checkOut),
      guests: searchParams.guests.toString(),
    });

    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <div className="relative z-20 -mt-16 max-w-[1000px] mx-auto px-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-end border border-gray-100">
        {/* CHECK-IN */}
        <div className="flex-1 w-full space-y-2">
          <label className="block text-xs font-bold uppercase text-gray-400">
            Nhận phòng
          </label>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              calendar_today
            </span>

            <DatePicker
              selected={searchParams.checkIn}
              onChange={(date: Date | null) =>
                setSearchParams({ ...searchParams, checkIn: date })
              }
              selectsStart
              startDate={searchParams.checkIn}
              endDate={searchParams.checkOut}
              minDate={new Date()}
              dateFormat="dd/MM/yy"
              placeholderText="Chọn ngày"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        </div>

        {/* CHECK-OUT */}
        <div className="flex-1 w-full space-y-2">
          <label className="block text-xs font-bold uppercase text-gray-400">
            Trả phòng
          </label>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              calendar_month
            </span>

            <DatePicker
              selected={searchParams.checkOut}
              onChange={(date: Date | null) =>
                setSearchParams({ ...searchParams, checkOut: date })
              }
              selectsEnd
              startDate={searchParams.checkIn}
              endDate={searchParams.checkOut}
              minDate={searchParams.checkIn || new Date()}
              dateFormat="dd/MM/yy"
              placeholderText="Chọn ngày"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        </div>

        {/* GUESTS */}
        <div className="flex-1 w-full space-y-2">
          <label className="block text-xs font-bold uppercase text-gray-400">
            Số khách
          </label>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              group
            </span>

            <input
              type="number"
              min={1}
              value={searchParams.guests}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  guests: e.target.value,
                })
              }
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              placeholder="Nhập số khách"
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full md:w-auto h-12 px-8 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-60"
        >
          <span className="material-symbols-outlined">search</span>
          {loading ? "Đang kiểm tra..." : "Tìm phòng"}
        </button>
      </div>

      {/* RESULT */}
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
