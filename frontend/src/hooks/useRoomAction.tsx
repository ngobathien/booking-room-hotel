import { toast } from "react-toastify";
import {
  deleteRoomById,
  getAllRooms,
  getDetailRoomById,
} from "../common/services/roomService";
import { useRoomContext } from "../context/RoomContext";

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

  // Lấy chi tiết một phòng
  const fetchRoomDetail = async (roomId: string) => {
    try {
      setLoading(true);
      const room = await getDetailRoomById(roomId);
      setCurrentRoom(room);
    } catch (error) {
      console.error("Fetch room detail failed", error);
    } finally {
      setLoading(false);
    }
  };

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
  return {
    fetchRoomDetail,
    fetchRooms,
    handleDeleteRoom,
  };
};

export default useRoomAction;
