import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Room } from "../../../types/room.types";
import { ROOM_TYPE_VI } from "../../../common/constants/roomType/roomType";

import ConfirmModal from "../../../common/components/ConfirmModal";

interface Props {
  rooms: Room[];
  onDelete: (id: string) => Promise<void> | void;
}

const RoomGrid: React.FC<Props> = ({ rooms, onDelete }) => {
  const navigate = useNavigate();

  // modal state
  const [openModal, setOpenModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (id: string) => {
    navigate(`edit/${id}`);
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm group hover:shadow-xl transition-all relative"
          >
            {/* IMAGE */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={room.thumbnail}
                alt={room.roomNumber}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* hover actions */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div className="flex gap-2 ml-auto">
                  <button
                    onClick={() => handleEdit(room._id)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/20 backdrop-blur hover:bg-white/40 transition"
                  >
                    <span className="material-symbols-outlined text-white text-[18px]">
                      edit
                    </span>
                  </button>

                  <button
                    onClick={() => handleDeleteClick(room)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-500/80 hover:bg-red-500 transition"
                  >
                    <span className="material-symbols-outlined text-white text-[18px]">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-5">
              <h3 className="text-lg font-bold mb-1 truncate text-slate-900">
                {room.roomNumber}
              </h3>

              <p className="text-primary font-black text-xl mb-4">
                {typeof room.roomType?.pricePerNight === "number"
                  ? `${room.roomType.pricePerNight.toLocaleString()} đ`
                  : "--"}
                <span className="text-xs text-slate-400 font-normal">
                  / đêm
                </span>
              </p>

              <div className="flex items-center gap-2 text-[10px] font-bold bg-slate-50 px-2 py-1 rounded text-slate-500 uppercase">
                <span className="material-symbols-outlined text-xs">group</span>
                {room.roomType?.capacity}
                <span className="material-symbols-outlined text-xs">hotel</span>
                {room.roomType?.typeName} (
                {ROOM_TYPE_VI[room.roomType?.typeName || ""]})
              </div>
            </div>
          </div>
        ))}
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

export default RoomGrid;
