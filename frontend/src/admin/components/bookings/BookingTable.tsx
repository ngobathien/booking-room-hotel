import { useState, useMemo } from "react";
import type { Booking } from "../../../types/booking.types";
import BookingStatusBadge from "./BookingStatusBadge";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  bookings: Booking[];
  onRowClick?: (id: string) => void;
};

export default function BookingTable({ bookings, onRowClick }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchSearch =
        booking.bookingCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.fullName?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        statusFilter === "All" || booking.bookingStatus === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [bookings, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-6">
      {/* Search + Filter */}

      <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

          <input
            type="text"
            placeholder="Tìm theo mã đơn, tên khách..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-xl"
        >
          <option value="All">Tất cả trạng thái</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="CheckedIn">Checked In</option>
          <option value="CheckedOut">Checked Out</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                Mã đơn
              </th>

              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                Khách hàng
              </th>

              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                Ngày đến
              </th>

              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                Ngày đi
              </th>

              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                Phòng
              </th>

              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                Tổng tiền
              </th>

              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                Thanh toán
              </th>

              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                Trạng thái
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {paginatedBookings.length > 0 ? (
              paginatedBookings.map((booking) => (
                <tr
                  key={booking._id}
                  onClick={() => onRowClick?.(booking._id)}
                  className="hover:bg-slate-50 cursor-pointer"
                >
                  <td className="px-6 py-4 font-bold text-emerald-600">
                    {booking.bookingCode}
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold">{booking.fullName}</p>

                      <p className="text-xs text-gray-500">
                        {booking.phone_number}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {new Date(booking.checkInDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">{booking.room?.roomNumber}</td>

                  <td className="px-6 py-4 font-semibold">
                    ${booking.totalPrice}
                  </td>

                  <td className="px-6 py-4">
                    <BookingStatusBadge status={booking.bookingStatus} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-400">
                  Không có booking
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}

        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-2 p-4 border-t">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2 border rounded"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? "bg-emerald-600 text-white" : "border"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2 border rounded"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
