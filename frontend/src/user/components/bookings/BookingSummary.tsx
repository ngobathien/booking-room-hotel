import React from "react";
import { ShieldCheck } from "lucide-react";
import type { Room } from "../../../types/room.types";

interface Props {
  rooms: Room[];
  nights: number;
  guests?: string | number;
}

const BookingSummary: React.FC<Props> = ({ rooms, nights, guests = 2 }) => {
  if (!rooms || rooms.length === 0) return null;

  // Tính tổng tiền tất cả phòng
  const total = rooms.reduce(
    (sum, room) => sum + (room.roomType.pricePerNight || 0) * nights,
    0,
  );

  return (
    <aside>
      <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100">
        <h3 className="text-lg font-bold mb-6">Tóm tắt đặt phòng</h3>

        {/* Danh sách phòng */}
        <div className="space-y-4 mb-6">
          {rooms.map((room) => (
            <div key={room._id} className="flex gap-4">
              <img
                src={room.images[0]}
                className="h-20 w-20 rounded-xl object-cover"
                alt={room.roomNumber}
              />
              <div>
                <h4 className="font-bold text-sm">Phòng #{room.roomNumber}</h4>
                <p className="text-xs text-slate-500 mt-1">
                  {room.roomType.typeName}
                </p>
                <div className="mt-2 text-primary font-bold text-sm">
                  {room.roomType.pricePerNight.toLocaleString()}đ / đêm
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Thông tin chung */}
        <div className="space-y-4 border-t border-slate-50 pt-6">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Thời gian</span>
            <span className="font-bold">{nights} đêm</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Người lớn</span>
            <span className="font-bold">{guests}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Trẻ em</span>
            <span className="font-bold">00</span>
          </div>
        </div>

        {/* Tổng cộng */}
        <div className="mt-6 space-y-3 border-t border-dashed border-slate-100 pt-6">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Giá phòng</span>
            <span className="font-bold">{total.toLocaleString()} VNĐ</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Phí dịch vụ</span>
            <span className="font-bold text-green-600">Miễn phí</span>
          </div>

          <div className="flex justify-between pt-2 text-xl font-black">
            <span>Tổng cộng</span>
            <span className="text-primary">{total.toLocaleString()} VNĐ</span>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
          <ShieldCheck className="h-5 w-5 text-green-500" />
          <p className="text-[10px] text-slate-500 font-medium">
            Đảm bảo giá tốt nhất & Thanh toán an toàn
          </p>
        </div>
      </div>
    </aside>
  );
};

export default BookingSummary;
