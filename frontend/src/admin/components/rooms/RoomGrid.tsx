import React from "react";
import { useNavigate } from "react-router-dom";
import type { Room } from "../../../types/room.types";

interface Props {
  rooms: Room[];
}

const RoomGrid: React.FC<Props> = ({ rooms }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {rooms.map((room) => (
        <div
          key={room._id}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm group hover:shadow-xl transition-all relative"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={room.thumbnail}
              alt={room.thumbnail}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <div className="flex gap-2 w-full">
                <button
                  onClick={() => navigate(`edit/${room._id}`)}
                  className="flex-1 bg-white/20 backdrop-blur text-white font-bold py-2 rounded-lg hover:bg-white/40 transition-all text-xs text-center"
                >
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-lg font-bold mb-1 truncate text-slate-900">
              {room.roomNumber}
            </h3>

            {/* pricePerNight */}
            <p className="text-primary font-black text-xl mb-4">
              {typeof room.roomType?.pricePerNight === "number"
                ? `${room.roomType.pricePerNight.toLocaleString()} đ`
                : "--"}
              <span className="text-xs text-slate-400 font-normal">/ đêm</span>
            </p>

            {/*  */}
            <div className="flex gap-2">
              <div className="flex items-center gap-1 text-[10px] font-bold bg-slate-50 px-2 py-1 rounded text-slate-500 uppercase">
                <span className="material-symbols-outlined text-xs">group</span>{" "}
                {room.roomType?.capacity}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomGrid;
