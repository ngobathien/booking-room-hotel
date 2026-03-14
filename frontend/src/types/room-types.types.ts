export interface RoomType {
  _id: string;
  typeName: string;
  capacity: number;
  pricePerNight: number;
}

export type CreateRoomTypeDto = {
  typeName: string;
  capacity: number;
  pricePerNight: number;
};

export interface RoomTypeContextType {
  roomTypes: RoomType[];
  loading: boolean;

  setRoomTypes: React.Dispatch<React.SetStateAction<RoomType[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
