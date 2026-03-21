import React from "react";
import type { Booking } from "../../../types/booking.types";
import { formatDateDDMMYY } from "../../../utils/formatDateVN";

type Props = {
  bookings: Booking[];
  onRowClick?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  COMPLETED: "bg-blue-100 text-blue-800",
};

export default function BookingTable({
  bookings,
  onRowClick,
  onEdit,
  onDelete,
}: Props) {
  if (bookings.length === 0)
    return <p className="text-center text-slate-500">Không có đơn đặt phòng</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-slate-200 divide-y divide-slate-200">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Mã Booking
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Khách hàng
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Ngày check-in
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Ngày check-out
            </th>

            <th className="px-4 py-2 text-left text-sm font-medium">Phòng</th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Tổng tiền
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Trạng thái
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {bookings.map((b) => (
            <tr key={b._id} className="hover:bg-slate-50 cursor-pointer">
              <td
                className="px-4 py-2 text-sm"
                onClick={() => onRowClick?.(b._id)}
              >
                {b.bookingCode}
              </td>

              <td
                className="px-4 py-2 text-sm"
                onClick={() => onRowClick?.(b._id)}
              >
                {b.fullName}
              </td>
              <td
                className="px-4 py-2 text-sm"
                onClick={() => onRowClick?.(b._id)}
              >
                {/* {b.checkInDate}  */}
                {formatDateDDMMYY(b.checkInDate)}
              </td>
              <td
                className="px-4 py-2 text-sm"
                onClick={() => onRowClick?.(b._id)}
              >
                {/* {b.checkOutDate} */}
                {formatDateDDMMYY(b.checkOutDate)}
              </td>
              <td
                className="px-4 py-2 text-sm"
                onClick={() => onRowClick?.(b._id)}
              >
                {b.room.roomNumber}
              </td>
              <td
                className="px-4 py-2 text-sm"
                onClick={() => onRowClick?.(b._id)}
              >
                {b.totalPrice.toLocaleString()}₫
              </td>
              <td
                className="px-4 py-2 text-sm"
                onClick={() => onRowClick?.(b._id)}
              >
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    STATUS_COLORS[b.bookingStatus]
                  }`}
                >
                  {b.bookingStatus}
                </span>
              </td>
              <td className="px-4 py-2 text-sm flex gap-2">
                <button
                  className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  onClick={() => onEdit?.(b._id)}
                >
                  Sửa
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => onDelete?.(b._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
