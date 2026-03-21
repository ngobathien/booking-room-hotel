import { useEffect, useState } from "react";
import type {
  CreateHotelDto,
  Hotel,
  UpdateHotelDto,
} from "../../types/hotel.types";
import { hotelService } from "../../common/services/hotelService";

export const useHotel = () => {
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(false);

  // GET FIRST HOTEL (vì thường chỉ có 1 hotel)
  const fetchHotel = async () => {
    try {
      setLoading(true);
      const data = await hotelService.getAll();
      setHotel(data[0]); // thường hệ thống chỉ 1 hotel
    } finally {
      setLoading(false);
    }
  };

  const createHotel = async (payload: CreateHotelDto) => {
    const data = await hotelService.create(payload);
    setHotel(data);
    return data;
  };

  const updateHotel = async (id: string, payload: UpdateHotelDto) => {
    const data = await hotelService.update(id, payload);
    setHotel(data);
    return data;
  };

  const deleteHotel = async (id: string) => {
    await hotelService.delete(id);
    setHotel(null);
  };

  useEffect(() => {
    fetchHotel();
  }, []);

  return {
    hotel,
    loading,
    fetchHotel,
    createHotel,
    updateHotel,
    deleteHotel,
  };
};
