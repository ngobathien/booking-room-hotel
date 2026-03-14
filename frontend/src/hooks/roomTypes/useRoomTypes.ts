import { useContext } from "react";
import { RoomTypeContext } from "../../context/roomType/RoomTypeContext";

export const useRoomTypeContext = () => {
  const context = useContext(RoomTypeContext);
  if (!context) {
    throw new Error("useRoomContext must be used within RoomProvider");
  }
  return context;
};
