import React from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import type { Room } from "../../../../types/room.types";
import { useRoomContext } from "../../../../hooks/room/useRoom";
import { useBooking } from "../../../../hooks/booking/useBooking";
import { Check, Plus } from "lucide-react";
import { cn } from "../../../../lib/utils";

interface RoomListViewProps {
  rooms: Room[];
}

export const RoomListView: React.FC<RoomListViewProps> = ({ rooms }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { filterParams } = useRoomContext();
  const hasValidDates =
    !!filterParams.checkInDate && !!filterParams.checkOutDate;

  const { addRoom, removeRoom, selectedRooms } = useBooking();

  if (!Array.isArray(rooms)) return null;

  const isSelected = (roomId: string) =>
    selectedRooms.some((r) => r._id === roomId);

  const toggleRoomSelection = (room: Room) => {
    if (isSelected(room._id)) {
      removeRoom(room._id);
    } else {
      addRoom(room);
    }
  };

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

            {/* Actions */}
            <div className="mt-8 flex gap-3 flex-wrap">
              {/* Chi tiết phòng */}
              <Link
                to={`/rooms/${room._id}/room-${room.roomNumber}${location.search}`}
                className="flex-1 min-w-[120px] rounded-xl border border-slate-200 py-3 text-center text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                Chi tiết
              </Link>

              {/* Toggle chọn/huỷ phòng */}
              <button
                onClick={() => toggleRoomSelection(room)}
                className={cn(
                  "flex-1 min-w-[120px] rounded-xl py-3 text-center text-sm font-bold transition-all flex items-center justify-center gap-2",
                  isSelected(room._id)
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    : "bg-slate-900 text-white hover:bg-black",
                )}
              >
                {isSelected(room._id) ? (
                  <>
                    <Check className="h-4 w-4" /> Đã thêm
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" /> Thêm vào đơn
                  </>
                )}
              </button>

              {/* Đặt ngay */}
              <button
                onClick={() => {
                  if (!isSelected(room._id)) addRoom(room);
                  navigate(
                    hasValidDates
                      ? `/checkout?rooms=${selectedRooms
                          .concat(room)
                          .map((r) => r._id)
                          .join(",")}&${searchParams.toString()}`
                      : `/rooms/${room._id}/room-${room.roomNumber}${location.search}`,
                  );
                }}
                className="flex-1 min-w-[120px] rounded-xl bg-primary py-3 text-center text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-blue-700 transition-all"
              >
                {hasValidDates ? "Đặt ngay" : "Chọn ngày để đặt"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
