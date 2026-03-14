import { useState } from "react";
import { RoomTypeContext } from "./RoomTypeContext";
import type { RoomType } from "../../types/room-types.types";

export const RoomTypeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <RoomTypeContext.Provider
      value={{
        roomTypes,
        loading,
        setRoomTypes,
        setLoading,
      }}
    >
      {children}
    </RoomTypeContext.Provider>
  );
};
