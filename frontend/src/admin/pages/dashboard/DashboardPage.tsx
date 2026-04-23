import { useDashboard } from "../../../hooks/dashboard/useDashboard";
import { BookingChart } from "../../components/charts/BookingChart";
import { RevenueChart } from "../../components/charts/RevenueChart";
import { RoomStatusChart } from "../../components/charts/RoomStatusChart";
import NotificationsCard from "../../components/NotificationsCard";

import { CalendarCheck, DollarSign, Filter, Hotel, Users } from "lucide-react";

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

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* FILTER */}
      <div className="flex flex-wrap gap-3 items-center bg-white p-4 rounded-2xl shadow-sm">
        <Filter className="text-gray-500" />

        {/* FROM DATE */}
        <input
          type="date"
          value={fromDate || ""}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        {/* TO DATE */}
        <input
          type="date"
          value={toDate || ""}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        {/* APPLY */}
        <button
          onClick={() => {
            if (fromDate && toDate && fromDate > toDate) {
              alert("Ngày bắt đầu không được lớn hơn ngày kết thúc");
              return;
            }

            refetch();
          }}
          className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded-lg"
        >
          Lọc
        </button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-white shadow rounded-2xl flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-xl">
            <Hotel className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Tổng phòng</p>
            <p className="text-xl font-semibold">{overview.rooms.total}</p>
          </div>
        </div>

        <div className="p-4 bg-white shadow rounded-2xl flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-xl">
            <CalendarCheck className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Đơn đặt</p>
            <p className="text-xl font-semibold">{overview.bookings.total}</p>
          </div>
        </div>

        <div className="p-4 bg-white shadow rounded-2xl flex items-center gap-4">
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

        <div className="p-4 bg-white shadow rounded-2xl flex items-center gap-4">
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

        <div className="bg-white p-4 rounded-2xl flex items-center justify-center text-gray-400">
          Coming soon...
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
