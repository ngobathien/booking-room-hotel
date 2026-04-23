import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ConfirmModal from "../../../common/components/ConfirmModal";
import type { RoomType } from "../../../types/room-types.types";

interface Props {
  roomTypes: RoomType[];
  loading: boolean;
  onDelete: (id: string) => Promise<void> | void;
}

const RoomTypeTable: React.FC<Props> = ({ roomTypes, loading, onDelete }) => {
  const navigate = useNavigate();

  // modal state
  const [openModal, setOpenModal] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (roomType: RoomType) => {
    setSelectedRoomType(roomType);
    setOpenModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRoomType) return;

    try {
      setIsDeleting(true);
      await onDelete(selectedRoomType._id);

      setOpenModal(false);
      setSelectedRoomType(null);
    } catch (error) {
      console.error("Error deleting room type:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
    setSelectedRoomType(null);
  };

  if (loading) {
    return <div className="p-6">Đang tải dữ liệu...</div>;
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
              <th className="px-6 py-4">Tên loại phòng</th>
              <th className="px-6 py-4">Sức chứa</th>
              <th className="px-6 py-4">Đơn giá</th>
              <th className="px-6 py-4">Tình trạng</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {roomTypes.map((rt) => (
              <tr
                key={rt._id}
                className="hover:bg-slate-50 transition-colors group"
              >
                <td className="px-6 py-3 font-bold text-slate-900">
                  {rt.typeName}
                </td>

                <td className="px-6 py-3 text-sm text-slate-500 font-medium">
                  {rt.capacity}
                </td>

                <td className="px-6 py-3 font-black text-primary">
                  {rt.pricePerNight} ₫
                </td>

                <td className="px-6 py-3 text-xs font-bold text-slate-400">
                  {/* trạng thái nếu có */}
                </td>

                <td className="px-6 py-3 text-right">
                  <button
                    onClick={() => navigate(`edit/${rt._id}`)}
                    className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <span className="material-symbols-outlined">
                      edit_square
                    </span>
                  </button>

                  <button
                    onClick={() => handleDeleteClick(rt)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CONFIRM MODAL */}
      <ConfirmModal
        open={openModal}
        title="Xóa loại phòng"
        message={`Bạn có chắc muốn xóa: ${selectedRoomType?.typeName}?`}
        data={selectedRoomType?._id}
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

export default RoomTypeTable;
