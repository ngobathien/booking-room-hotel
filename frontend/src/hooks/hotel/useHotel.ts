import { useEffect, useState } from "react";
import type {
  CreateHotelDto,
  Hotel,
  UpdateHotelDto,
} from "../../types/hotel.types";
import {
  createHotel as createHotelApi,
  updateHotel as updateHotelApi,
  deleteHotel as deleteHotelApi,
  getHotelInfo,
} from "../../common/services/hotelService";

export const useHotel = () => {
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchHotel = async () => {
    try {
      setLoading(true);
      const data = await getHotelInfo();
      setHotel(data);
    } finally {
      setLoading(false);
    }
  };

  const createHotel = async (payload: CreateHotelDto) => {
    const data = await createHotelApi(payload);
    setHotel(data);
    return data;
  };

  const updateHotel = async (id: string, payload: UpdateHotelDto) => {
    const data = await updateHotelApi(id, payload);
    setHotel(data);
    return data;
  };

  const deleteHotel = async (id: string) => {
    await deleteHotelApi(id);
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
