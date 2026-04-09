// hooks/useRoomAmenities.ts
import { useState } from "react";
import { toast } from "react-toastify";
import {
  getAmenitiesByRoom,
  assignAmenitiesToRoom,
  removeAllAmenitiesFromRoom,
} from "../../common/services/roomAmenities.service";

export const useRoomAmenities = () => {
  const [loading, setLoading] = useState(false);

  const fetchByRoom = async (roomId: string) => {
    setLoading(true);
    try {
      return await getAmenitiesByRoom(roomId);
    } catch (error) {
      toast.error("Lấy tiện ích phòng thất bại");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const assignAmenities = async (roomId: string, amenityIds: string[]) => {
    setLoading(true);
    try {
      await assignAmenitiesToRoom(roomId, amenityIds);
    } catch (error) {
      toast.error("Gán tiện ích thất bại");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeAll = async (roomId: string) => {
    setLoading(true);
    try {
      await removeAllAmenitiesFromRoom(roomId);
    } catch (error) {
      toast.error("Xóa tiện ích thất bại");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchByRoom, assignAmenities, removeAll };
};
