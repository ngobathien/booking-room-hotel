import React, { createContext, useContext, useEffect, useState } from "react";
import type { Room, RoomContextType } from "../types/room.types";
import {
  getAllRooms,
  searchAvailableRooms,
} from "../common/services/roomService";
import { useSearchParams } from "react-router";

const RoomContext = createContext<RoomContextType | null>(null);

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(false);

  // Lấy search params để sync với filter UI
  const [searchParams] = useSearchParams();
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
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoomContext must be used within RoomProvider");
  }
  return context;
};
