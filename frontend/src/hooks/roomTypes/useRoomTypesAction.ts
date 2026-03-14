import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  createNewRoomType,
  deleteRoomTypeById,
  getAllRoomTypes,
  updateRoomTypeById,
} from "../../common/services/roomTypeService";
import type { CreateRoomTypeDto, RoomType } from "../../types/room-types.types";
import { useRoomTypeContext } from "./useRoomTypes";

export const useRoomTypesAction = () => {
  const { roomTypes, setRoomTypes, loading, setLoading } = useRoomTypeContext();

  const fetchRoomTypes = async () => {
    setLoading(true);
    const data = await getAllRoomTypes();
    setRoomTypes(data);
    setLoading(false);
  };

  const createRoomType = async (data: CreateRoomTypeDto) => {
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
    setRoomTypes,
    roomTypes,
    loading,
    createRoomType,
    deleteRoomType,
    updateRoomType,
  };
};
