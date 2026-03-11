import React from "react";
import { Link } from "react-router-dom";

interface RoomType {
  _id: string;
  typeName: string;
  capacity: number;
  pricePerNight: number;
}

interface Room {
  _id: string;
  roomNumber: string;
  thumbnail: string;
  description: string;
  roomType: RoomType;
}

interface RoomListViewProps {
  rooms: Room[];
}

export const RoomListView: React.FC<RoomListViewProps> = ({ rooms }) => {
  if (!Array.isArray(rooms)) return null;

  return (
    <div className="flex flex-col gap-6">
      {rooms.map((room) => (
        <div
          key={room._id}
          className="group overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-100 flex flex-col md:flex-row"
        >
          {/* Image */}
          <div className="relative overflow-hidden w-full md:w-80 h-64 md:h-auto">
            <img
              src={room.thumbnail}
              alt={room.roomNumber}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute right-4 top-4 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-slate-900 shadow-sm">
              #{room.roomNumber}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-2xl">
                    {room.roomType?.typeName}
                  </h3>

                  <div className="mt-2 text-xs font-medium text-slate-400">
                    {room.roomType?.capacity} Khách
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                    Chỉ từ
                  </div>
                  <div className="font-black text-primary text-2xl">
                    {room.roomType?.pricePerNight?.toLocaleString()}đ
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">
                    /đêm
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-500 line-clamp-3">
                {room.description}
              </p>
            </div>

            <div className="mt-8 flex gap-3">
              <Link
                to={`/rooms/${room._id}/room-${room.roomNumber}`}
                className="flex-1 rounded-xl border border-slate-200 py-3 text-center text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                Chi tiết
              </Link>

              <Link
                to={`/checkout/${room._id}`}
                className="flex-1 rounded-xl bg-primary py-3 text-center text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-blue-700 transition-all"
              >
                Đặt ngay
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
