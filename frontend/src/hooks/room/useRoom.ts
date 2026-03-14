import { useContext } from "react";
import { RoomContext } from "../../context/room/RoomContext";

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoomContext must be used within RoomProvider");
  }
  return context;
};
