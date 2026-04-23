import { toast } from "react-toastify";
import {
  createNewRoom,
  deleteRoomById,
  getDetailRoomById,
  getDetailRoomWithAmenitiesById,
  updateRoom,
} from "../../common/services/roomService";
import type { CreateRoomPayload } from "../../types/room.types";
import { useRoomContext } from "./useRoom";

const useRoomAction = () => {
  const { setCurrentRoom, setLoading, setRooms } = useRoomContext();

  // Lấy tất cả danh sách room
  // const fetchRooms = async () => {
  //   try {
  //     setLoading(true);
  //     const rooms = await getAllRooms();
  //     setRooms(rooms);
  //   } catch (error) {
  //     console.error("Fetch room detail failed", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // thêm một phòng mới
  const handleCreateNewRoom = async (
    data: CreateRoomPayload,
    files?: File[],
  ) => {
    try {
      const newRoom = await createNewRoom(data, files);

      setRooms((prev) => [...prev, newRoom]); // add vào list
      return newRoom;
    } catch (error) {
      console.error("Thêm phòng thất bại", error);
      throw error;
    }
  };

  // cập nhật phòng
  const handleUpdateRoom = async (
    roomId: string,
    data: Partial<CreateRoomPayload>,
    files?: File[],
  ) => {
    try {
      const updatedRoom = await updateRoom(roomId, data, files);

      // toast.success("Cập nhật phòng thành công");

      setRooms((prev) =>
        prev.map((room) => (room._id === roomId ? updatedRoom : room)),
      );

      return updatedRoom;
    } catch (error) {
      console.error("Cập nhật phòng thất bại", error);
      // toast.error("Cập nhật phòng thất bại");
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

  // Lấy chi tiết một phòng + amenities
  const getRoomWithAmenitiesById = async (roomId: string) => {
    try {
      setLoading(true);
      const room = await getDetailRoomWithAmenitiesById(roomId); // API trả về room + amenities
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
    try {
      await deleteRoomById(id);
      toast.success("Xóa phòng thành công");
      setRooms((prev) => prev.filter((rt) => rt._id !== id));
    } catch (error) {
      console.error("Xóa thất bại", error);
      toast.error("Lỗi khi xóa phòng");
      throw error;
    }
  };

  //
  return {
    getRoomById,
    handleCreateNewRoom,
    getRoomWithAmenitiesById,
    handleUpdateRoom,
    handleDeleteRoom,
  };
};

export default useRoomAction;
