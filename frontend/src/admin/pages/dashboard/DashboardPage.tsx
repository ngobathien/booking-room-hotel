import { useDashboard } from "../../../hooks/dashboard/useDashboard";
import { BookingChart } from "../../components/charts/BookingChart";
import { RevenueChart } from "../../components/charts/RevenueChart";
import { RoomStatusChart } from "../../components/charts/RoomStatusChart";

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
      <div>
        <p>Lỗi: {error}</p>
        <button onClick={refetch}>Thử lại</button>
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      {/* FILTER DATE */}
      <div className="flex gap-2 items-center bg-white p-3 rounded-xl shadow">
        <input
          type="date"
          value={fromDate || ""}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={toDate || ""}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={refetch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Lọc
        </button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-white shadow rounded-xl">
          Tổng phòng: {overview.rooms.total}
        </div>

        <div className="p-4 bg-white shadow rounded-xl">
          Tổng đơn đặt: {overview.bookings.total}
        </div>

        <div className="p-4 bg-white shadow rounded-xl">
          Doanh thu:{" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(overview.revenue.total)}
        </div>

        <div className="p-4 bg-white shadow rounded-xl">
          Người dùng: {overview.users.total}
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-4">
        <RevenueChart data={revenue} />
        <BookingChart data={booking} />
      </div>

      {/* ROOM STATUS */}
      <RoomStatusChart data={overview} />
    </div>
  );
};

export default DashboardPage;
