import { toast } from "react-toastify";
import {
  createNewRoom,
  deleteRoomById,
  getAllRooms,
  getDetailRoomById,
  updateRoom,
} from "../../common/services/roomService";
import type { CreateRoomPayload } from "../../types/room.types";
import { useRoomContext } from "./useRoom";

const useRoomAction = () => {
  const { setCurrentRoom, setLoading, setRooms } = useRoomContext();

  // Lấy tất cả danh sách room
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const rooms = await getAllRooms();
      setRooms(rooms);
    } catch (error) {
      console.error("Fetch room detail failed", error);
    } finally {
      setLoading(false);
    }
  };

  // thêm một phòng mới
  const handleCreateNewRoom = async (data: CreateRoomPayload) => {
    try {
      const newRoom = await createNewRoom(data);
      toast.success("Thêm phòng thành công");

      setRooms((prev) => [...prev, newRoom]); // add vào list
    } catch (error) {
      console.error("Thêm phòng thất bại", error);
      throw error;
    }
  };

  // cập nhật phòng
  const handleUpdateRoom = async (
    roomId: string,
    data: Partial<CreateRoomPayload>,
  ) => {
    try {
      const updatedRoom = await updateRoom(roomId, data);
      toast.success("Cập nhật phòng thành công");

      setRooms((prev) =>
        prev.map((room) => (room._id === roomId ? updatedRoom : room)),
      );

      return updatedRoom;
    } catch (error) {
      toast.error("Cập nhật phòng thất bại");
      throw error;
    }
  };
  // Lấy chi tiết một phòng
  const getRoomById = async (roomId: string) => {
    try {
      setLoading(true);
      const room = await getDetailRoomById(roomId);
      setCurrentRoom(room);
      return room;
    } catch (error) {
      console.error("Fetch room detail failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // xóa một phòng
  const handleDeleteRoom = async (id: string) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa phòng này?",
    );
    if (!confirmDelete) return;
    try {
      await deleteRoomById(id);
      toast.success("Xóa phòng thành công");
      setRooms((prev) => prev.filter((rt) => rt._id !== id));
    } catch (error) {
      console.error("Xóa thất bại", error);
    }
  };

  //
  return {
    getRoomById,
    handleCreateNewRoom,
    handleUpdateRoom,
    handleDeleteRoom,
  };
};

export default useRoomAction;
