import { createContext } from "react";
import type { RoomContextType } from "../../types/room.types";

export const RoomContext = createContext<RoomContextType | null>(null);
