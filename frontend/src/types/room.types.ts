import type { RoomType } from "./room-types.types";

export const RoomStatus = {
  AVAILABLE: "AVAILABLE",
  BOOKED: "BOOKED",
  MAINTENANCE: "MAINTENANCE",
};

// export enum RoomType {
//   STANDARD = "Standard Double",
//   DELUXE = "Deluxe Suite",
//   SINGLE = "Single Economy",
//   EXECUTIVE = "Executive King",
//   PRESIDENTIAL = "Presidential Suite",
// }

export type RoomStatusType =
  | "AVAILABLE"
  | "OCCUPIED"
  | "BOOKED"
  | "MAINTENANCE";

// export interface RoomType {
//   typeName: string;
//   capacity: number;
//   pricePerNight: number;
// }

// phục vụ cho việc data tạo phòng
export interface CreateRoomPayload {
  roomNumber: string;
  hotelId: string;
  roomType: string; // ObjectId
  status: "AVAILABLE" | "OCCUPIED" | "BOOKED" | "MAINTENANCE";
  thumbnail?: string;
  images?: string[];
  description: string;
}

export interface Room {
  _id: string;
  roomNumber: string;
  thumbnail: string;
  roomType: RoomType;
  status: RoomStatusType;
  images: string[];
  description: string;
}

export interface RoomContextType {
  rooms: Room[];
  currentRoom: Room | null;
  loading: boolean;

  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  setCurrentRoom: React.Dispatch<React.SetStateAction<Room | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const STATUS_ROOM_STYLE = {
  AVAILABLE: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  BOOKED: "bg-amber-100 text-amber-700 border border-amber-200",
  MAINTENANCE: "bg-rose-100 text-rose-700 border border-rose-200",
} as const;
