import React from "react";
import { useNavigate } from "react-router";
import {
  RoomStatus,
  type Room,
  type RoomStatusType,
} from "../../../types/room.types";

interface RoomTableProps {
  rooms: Room[];
  // onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}
const RoomListTable: React.FC<RoomTableProps> = ({ rooms, onDelete }) => {
  const navigate = useNavigate();
  const getStatusBadge = (status: RoomStatusType) => {
    switch (status) {
      case RoomStatus.AVAILABLE:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-bold">
            <span className="size-1.5 rounded-full bg-success"></span>
            Có sẵn
          </span>
        );
      case RoomStatus.BOOKED:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-bold">
            <span className="size-1.5 rounded-full bg-primary-600"></span>
            Đã được đặt
          </span>
        );
      case RoomStatus.MAINTENANCE:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warning/10 text-warning text-xs font-bold">
            <span className="size-1.5 rounded-full bg-warning"></span>
            Bảo trì
          </span>
        );
    }
  };

  //
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* tiêu đề */}
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200">
              {/* Tên phòng */}
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-32">
                Tên phòng #
              </th>

              {/* loại phòng */}
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Loại phòng
              </th>
              {/* Tiện ích */}
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Tiện ích
              </th>

              {/* status */}
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>

              {/* Giá / Đêm */}
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Giá / Đêm
              </th>

              {/* Thao tác */}
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                Thao tác
              </th>
            </tr>
          </thead>

          {/* Dữ liệu danh sách phòng */}
          <tbody className="divide-y divide-[#e7ebf3]">
            {rooms?.map((room) => (
              <tr
                key={room._id}
                className="hover:bg-gray-50/80 transition-colors group"
              >
                {/* roomNumber */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-bold text-gray-900">
                    {room.roomNumber}
                  </span>
                </td>

                {/* roomType */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-gray-400 text-lg">
                      {/* {getRoomIcon(rooms.roomType)} */}
                    </span>
                    <span className="text-sm text-gray-700 font-medium">
                      {room.roomType?.typeName ?? "Chưa có"}
                    </span>
                  </div>
                </td>

                {/* amenities */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {room.amenities && room.amenities.length > 0 ? (
                      room.amenities.map((a) => (
                        <span
                          key={a._id}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs"
                        >
                          {a.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">--</span>
                    )}
                  </div>
                </td>

                {/* status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(room.status)}
                </td>

                {/* pricePerNight */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-semibold text-gray-900">
                    {room.roomType?.pricePerNight?.toLocaleString() ?? "--"} đ
                  </span>
                </td>

                {/* nút thao tác */}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* nút sửa phòng*/}
                    <button
                      onClick={() => navigate(`edit/${room._id}`)}
                      className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-lg">
                        edit
                      </span>
                    </button>

                    {/* nút xóa phòng*/}
                    <button
                      onClick={() => onDelete(room._id)}
                      className="p-2 text-gray-400 hover:text-danger hover:bg-red-50 rounded-lg transition-all"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-lg">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomListTable;
