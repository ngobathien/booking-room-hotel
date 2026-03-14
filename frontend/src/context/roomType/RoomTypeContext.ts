import { createContext } from "react";
import type { RoomTypeContextType } from "../../types/room-types.types";

export const RoomTypeContext = createContext<RoomTypeContextType | null>(null);
