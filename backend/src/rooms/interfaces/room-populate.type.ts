import { Types } from 'mongoose';
import { RoomStatus } from '../enums/room-status.enum';

export interface RoomTypeLean {
  _id: Types.ObjectId;
  typeName: string;
  capacity: number;
  pricePerNight: number;
}

export interface RoomLean {
  _id: Types.ObjectId;
  roomNumber: string;
  thumbnail?: string;
  images: string[];
  description?: string;
  status: RoomStatus;
  hotelId: Types.ObjectId;

  roomType: RoomTypeLean;
}
