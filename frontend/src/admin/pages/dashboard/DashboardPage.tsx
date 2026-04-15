import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useDashboard } from "../../../hooks/dashboard/useDashboard";
import { BookingChart } from "../../components/charts/BookingChart";
import { RevenueChart } from "../../components/charts/RevenueChart";
import { RoomStatusChart } from "../../components/charts/RoomStatusChart";
import NotificationsCard from "../../components/NotificationsCard";

import { Hotel, CalendarCheck, DollarSign, Users, Filter } from "lucide-react";
import { startOfToday } from "date-fns";

const DashboardPage = () => {
  const {
    overview,
    revenue,
    booking,
    loading,
    error,
    refetch,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
  } = useDashboard();

  if (loading) return <p>Đang tải dashboard...</p>;

  if (error)
    return (
      <div className="p-6">
        <p className="text-red-500 mb-2">Lỗi: {error}</p>
        <button
          onClick={() => refetch()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Thử lại
        </button>
      </div>
    );

  const formatISO = (date: Date | null) => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* FILTER */}
      <div className="flex flex-wrap gap-3 items-center bg-white p-4 rounded-2xl shadow-sm">
        <Filter className="text-gray-500" />

        {/* FROM DATE */}
        <div className="relative">
          <DatePicker
            selected={fromDate}
            onChange={(date: Date | null) => setFromDate(date)}
            selectsStart
            startDate={fromDate}
            endDate={toDate}
            minDate={startOfToday()}
            placeholderText="Từ ngày"
            dateFormat="dd/MM/yy"
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* TO DATE */}
        <div className="relative">
          <DatePicker
            selected={toDate}
            onChange={(date: Date | null) => setToDate(date)}
            selectsEnd
            startDate={fromDate}
            endDate={toDate}
            minDate={fromDate || startOfToday()}
            placeholderText="Đến ngày"
            dateFormat="dd/MM/yy"
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* APPLY */}
        <button
          onClick={() =>
            refetch({
              fromDate: formatISO(fromDate),
              toDate: formatISO(toDate),
            })
          }
          className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded-lg"
        >
          Lọc
        </button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-white shadow rounded-2xl flex items-center gap-4 hover:shadow-md transition">
          <div className="bg-blue-100 p-3 rounded-xl">
            <Hotel className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Tổng phòng</p>
            <p className="text-xl font-semibold">{overview.rooms.total}</p>
          </div>
        </div>

        <div className="p-4 bg-white shadow rounded-2xl flex items-center gap-4 hover:shadow-md transition">
          <div className="bg-green-100 p-3 rounded-xl">
            <CalendarCheck className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Đơn đặt</p>
            <p className="text-xl font-semibold">{overview.bookings.total}</p>
          </div>
        </div>

        <div className="p-4 bg-white shadow rounded-2xl flex items-center gap-4 hover:shadow-md transition">
          <div className="bg-yellow-100 p-3 rounded-xl">
            <DollarSign className="text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Doanh thu</p>
            <p className="text-xl font-semibold">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(overview.revenue.total)}
            </p>
          </div>
        </div>

        <div className="p-4 bg-white shadow rounded-2xl flex items-center gap-4 hover:shadow-md transition">
          <div className="bg-purple-100 p-3 rounded-xl">
            <Users className="text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Người dùng</p>
            <p className="text-xl font-semibold">{overview.users.total}</p>
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow">
          <RevenueChart data={revenue} />
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <BookingChart data={booking} />
        </div>
      </div>

      {/* BOTTOM */}
      <div className="grid grid-cols-3 gap-4">
        <NotificationsCard />

        <div className="bg-white p-4 rounded-2xl shadow">
          <RoomStatusChart data={overview} />
        </div>

        <div className="bg-white p-4 rounded-2xl shadow flex items-center justify-center text-gray-400">
          Coming soon...
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
