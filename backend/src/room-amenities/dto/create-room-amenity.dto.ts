// room-amenities/dto/create-room-amenity.dto.ts
import { IsArray, IsMongoId, ArrayNotEmpty } from 'class-validator';

export class CreateRoomAmenityDto {
  @IsMongoId()
  roomId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  amenityIds: string[];
}
