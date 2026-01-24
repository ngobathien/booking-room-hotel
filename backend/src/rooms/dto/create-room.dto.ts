import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { RoomStatus } from '../enums/room-status.enum';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  roomNumber: string;

  @IsMongoId()
  hotelId: string;

  @IsMongoId()
  roomType: string;

  @IsEnum(RoomStatus)
  status: RoomStatus;
}
