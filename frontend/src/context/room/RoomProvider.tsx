import React, { useEffect, useState } from "react";
import type { Room } from "../../types/room.types";
import {
  getAllRooms,
  searchAvailableRooms,
} from "../../common/services/roomService";
import { useSearchParams } from "react-router";
import { RoomContext } from "./room.context";

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(false);

  // Lấy search params để sync với filter UI
  const [searchParams] = useSearchParams();

  const filterParams = {
    checkInDate: searchParams.get("checkInDate") || "",
    checkOutDate: searchParams.get("checkOutDate") || "",
    guests: Number(searchParams.get("guests") || 1),
  };

  //
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);

        const params = Object.fromEntries([...searchParams]);

        const checkInDate = searchParams.get("checkInDate");
        const checkOutDate = searchParams.get("checkOutDate");
        const guests = searchParams.get("guests");

        // nếu có query params thì search
        if (checkInDate && checkOutDate && guests) {
          const data = await searchAvailableRooms({
            checkInDate,
            checkOutDate,
            guests: parseInt(guests),
          });

          //
          setRooms(data.rooms);
          // nếu không có thì lấy tất cả room
        } else {
          const roomsData = await getAllRooms(params);
          console.log("roomsData:", roomsData);
          setRooms(roomsData);
        }
      } catch (error) {
        console.error("Fetch rooms failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [searchParams]);
  return (
    <RoomContext.Provider
      value={{
        rooms,
        currentRoom,
        loading,
        setRooms,
        setCurrentRoom,
        setLoading,
        filterParams,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
