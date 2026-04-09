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
  status: RoomStatusType;
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
  amenities?: { _id: string; name: string }[];
}

export interface FilterParams {
  checkInDate: string | null;
  checkOutDate: string | null;
  guests: number | null;
}

export interface RoomContextType {
  rooms: Room[];
  currentRoom: Room | null;
  loading: boolean;

  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  setCurrentRoom: React.Dispatch<React.SetStateAction<Room | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  filterParams: FilterParams;
}

// dùng cho search phòng
export interface SearchRoomParams {
  checkInDate: string;
  checkOutDate: string;
  guests: number;
}
export interface SearchRoomResponse {
  total: number;
  rooms: Room[];
}

export const STATUS_ROOM_STYLE: Record<RoomStatusType, string> = {
  AVAILABLE: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  BOOKED: "bg-amber-100 text-amber-700 border border-amber-200",
  OCCUPIED: "bg-blue-100 text-blue-700 border border-blue-200",
  MAINTENANCE: "bg-rose-100 text-rose-700 border border-rose-200",
};

export const STATUS_ROOM_LABEL: Record<RoomStatusType, string> = {
  AVAILABLE: "Còn trống",
  BOOKED: "Đã đặt",
  OCCUPIED: "Đang sử dụng",
  MAINTENANCE: "Bảo trì",
};
