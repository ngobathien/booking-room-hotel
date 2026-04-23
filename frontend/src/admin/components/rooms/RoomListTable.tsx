import React, { useState } from "react";
import { useNavigate } from "react-router";

import ConfirmModal from "../../../common/components/ConfirmModal";

import {
  RoomStatus,
  type Room,
  type RoomStatusType,
} from "../../../types/room.types";

interface RoomTableProps {
  rooms: Room[];
  onDelete: (id: string) => Promise<void> | void;
}

const RoomListTable: React.FC<RoomTableProps> = ({ rooms, onDelete }) => {
  const navigate = useNavigate();

  // modal state
  const [openModal, setOpenModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  // open modal
  const handleDeleteClick = (room: Room) => {
    setSelectedRoom(room);
    setOpenModal(true);
  };

  const handleCancel = () => {
    setOpenModal(false);
    setSelectedRoom(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRoom) return;

    try {
      setIsDeleting(true);
      await onDelete(selectedRoom._id);

      setOpenModal(false);
      setSelectedRoom(null);
    } catch (error) {
      console.error("Delete room error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-32">
                  Tên phòng #
                </th>

                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Loại phòng
                </th>

                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Tiện ích
                </th>

                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>

                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Giá / Đêm
                </th>

                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#e7ebf3]">
              {rooms?.map((room) => (
                <tr
                  key={room._id}
                  className="hover:bg-gray-50/80 transition-colors group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-900">
                      {room.roomNumber}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700 font-medium">
                      {room.roomType?.typeName ?? "Chưa có"}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {room.amenities?.length ? (
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

                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(room.status)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      {room.roomType?.pricePerNight?.toLocaleString() ?? "--"} đ
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => navigate(`edit/${room._id}`)}
                        className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                      >
                        <span className="material-symbols-outlined text-lg">
                          edit
                        </span>
                      </button>

                      <button
                        onClick={() => handleDeleteClick(room)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
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

      {/* CONFIRM MODAL */}
      <ConfirmModal
        open={openModal}
        title="Xóa phòng"
        message={`Bạn có chắc muốn xóa phòng: ${selectedRoom?.roomNumber}?`}
        data={selectedRoom?._id}
        onCancel={handleCancel}
        onConfirm={handleConfirmDelete}
        confirmText="Xóa"
        cancelText="Hủy"
        isDangerous={true}
        isLoading={isDeleting}
      />
    </>
  );
};

export default RoomListTable;
