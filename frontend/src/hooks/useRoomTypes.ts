import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createNewRoomType,
  deleteRoomTypeById,
  getAllRoomTypes,
  updateRoomTypeById,
} from "../common/services/roomTypeService";
import type { RoomType } from "../types/room-types.types";

export const useRoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRoomTypes = async () => {
    setLoading(true);
    const data = await getAllRoomTypes();
    setRoomTypes(data);
    setLoading(false);
  };

  const createRoomType = async (data: RoomType) => {
    await createNewRoomType(data);
    toast.success("Thêm loại phòng thành công");
    fetchRoomTypes();
  };

  const updateRoomType = async (id: string, data: Partial<RoomType>) => {
    try {
      await updateRoomTypeById(id, data);
      toast.success("Cập nhật loại phòng thành công");
      fetchRoomTypes();
    } catch (error) {
      console.log(error);
      toast.error(`Cập nhật loại phòng ${id} thất bại`);
    }
  };

  const deleteRoomType = async (id: string) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa loại phòng này?",
    );
    if (!confirmDelete) return;
    await deleteRoomTypeById(id);
    toast.success("Xóa loại phòng thành công");
    setRoomTypes((prev) => prev.filter((rt) => rt._id !== id));
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  return {
    roomTypes,
    loading,
    createRoomType,
    deleteRoomType,
    updateRoomType,
  };
};
