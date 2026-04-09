import { Module } from '@nestjs/common';
import { RoomAmenitiesService } from './room-amenities.service';
import { RoomAmenitiesController } from './room-amenities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomAmenity, RoomAmenitySchema } from './schemas/room-amenity.schema';
import { Amenity, AmenitySchema } from 'src/amenities/schemas/amenity.schema';
import { Room, RoomSchema } from 'src/rooms/schemas/room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoomAmenity.name, schema: RoomAmenitySchema },
      { name: Amenity.name, schema: AmenitySchema },
      { name: Room.name, schema: RoomSchema },
    ]),
  ],
  controllers: [RoomAmenitiesController],
  providers: [RoomAmenitiesService],
  exports: [RoomAmenitiesService],
})
export class RoomAmenitiesModule {}
