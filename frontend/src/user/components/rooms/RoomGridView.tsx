import React from "react";
import { Link } from "react-router-dom";
import type { Room } from "../../types/room.types";

interface RoomGridViewProps {
  rooms: Room[];
}

export const RoomGridView: React.FC<RoomGridViewProps> = ({ rooms }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {rooms.map((room) => (
        <div
          key={room._id}
          className="group overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-100 flex flex-col"
        >
          {/* Thumbnail */}
          <div className="relative h-64 w-full overflow-hidden">
            <img
              src={room.thumbnail}
              alt={room.roomNumber}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Room number */}
            <div className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-900 shadow-sm">
              #{room.roomNumber}
            </div>

            {/* Status */}
            <div className="absolute left-4 top-4 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
              {room.status}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-xl">
                {room.roomType.typeName}
              </h3>

              <div className="mt-2 text-sm text-slate-500">
                Sức chứa: {room.roomType.capacity} khách
              </div>

              <p className="mt-4 text-sm text-slate-500 line-clamp-2">
                {room.description}
              </p>
            </div>

            {/* Price + Actions */}
            <div className="mt-6">
              <div className="text-xs font-bold text-slate-400 uppercase">
                Giá mỗi đêm
              </div>

              <div className="font-black text-primary text-xl mt-1">
                {room.roomType.pricePerNight.toLocaleString()}đ
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  to={`/rooms/${room._id}`}
                  className="flex-1 rounded-xl border border-slate-200 py-3 text-center text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Chi tiết
                </Link>

                <Link
                  to={`/checkout/${room._id}`}
                  className="flex-1 rounded-xl bg-primary py-3 text-center text-sm font-bold text-white hover:bg-blue-700 transition-all"
                >
                  Đặt ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
