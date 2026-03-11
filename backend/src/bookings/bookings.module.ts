import { forwardRef, Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schemas/booking.schema';
import {
  RoomType,
  RoomTypeSchema,
} from 'src/room-types/schemas/room-type.schema';
import { Room, RoomSchema } from 'src/rooms/schemas/room.schema';
import { UsersModule } from 'src/users/users.module';
import { RoomTypesModule } from 'src/room-types/room-types.module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    RoomTypesModule,
    UsersModule,
    forwardRef(() => RoomsModule),

    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: RoomType.name, schema: RoomTypeSchema },
      { name: Room.name, schema: RoomSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
