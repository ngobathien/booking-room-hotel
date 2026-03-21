import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../../hooks/booking/useBooking";
import { useBookingAction } from "../../../hooks/booking/useBookingAction";
import BookingTable from "../../components/bookings/BookingTable";
import BookingStats from "../../components/bookings/BookingStats";
import { BOOKING_STATUS } from "../../../types/booking.types";

export default function BookingManagement() {
  const { bookings, stats, loading } = useBooking();
  const { fetchAllBookings, fetchBookingStats, cancelBookingAction } =
    useBookingAction();
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAllBookings();
    fetchBookingStats();
  }, []);

  const filteredBookings = bookings
    ? bookings.filter((b) => {
        const matchesStatus = filterStatus
          ? b.bookingStatus === filterStatus
          : true;
        const matchesSearch =
          search === "" ||
          b.fullName.toLowerCase().includes(search.toLowerCase()) ||
          b.bookingCode.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
      })
    : [];

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Quản lý Đơn đặt phòng
        </h1>
        <p className="text-slate-500">
          Theo dõi và quản lý tất cả các yêu cầu đặt phòng của khách hàng
        </p>
      </div>

      {/* Stats */}
      <BookingStats stats={stats} />

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc mã đặt phòng..."
          className="border border-slate-300 rounded-md px-4 py-2 w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            className={`px-3 py-1 rounded ${
              filterStatus === null ? "bg-blue-500 text-white" : "bg-slate-200"
            }`}
            onClick={() => setFilterStatus(null)}
          >
            Tất cả
          </button>
          {Object.values(BOOKING_STATUS).map((status) => (
            <button
              key={status}
              className={`px-3 py-1 rounded ${
                filterStatus === status
                  ? "bg-blue-500 text-white"
                  : "bg-slate-200"
              }`}
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <BookingTable
        bookings={filteredBookings}
        onRowClick={(id) => navigate(`/dashboard/bookings/${id}`)}
        onEdit={(id) => navigate(`/dashboard/bookings/edit/${id}`)}
        onDelete={async (id) => {
          if (confirm("Bạn có chắc muốn xóa booking này không?")) {
            await cancelBookingAction(id); // dùng hàm hủy booking từ hook
            fetchAllBookings(); // reload danh sách
          }
        }}
      />
    </div>
  );
}
