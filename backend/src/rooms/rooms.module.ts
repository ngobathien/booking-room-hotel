import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Room, RoomSchema } from './schemas/room.schema';

import { RoomTypesModule } from '../room-types/room-types.module';
import { UsersModule } from '../users/users.module';

import { RoomAmenitiesModule } from '../room-amenities/room-amenities.module';
import { BookingsModule } from '../bookings/bookings.module';
import { Booking, BookingSchema } from '../bookings/schemas/booking.schema';
import { SupabaseService } from '../config/supabase.config';
import {
  RoomType,
  RoomTypeSchema,
} from '../room-types/schemas/room-type.schema';

@Module({
  imports: [
    RoomTypesModule,
    UsersModule,
    ConfigModule,
    BookingsModule,
    RoomAmenitiesModule,

    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: RoomType.name, schema: RoomTypeSchema },
      { name: Booking.name, schema: BookingSchema },
    ]),

    // để hờ xem có cần đến ko
    // JwtModule.register({
    //   global: true,
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '1d' },
    // }),
  ],
  controllers: [RoomsController],
  providers: [RoomsService, SupabaseService],
  exports: [RoomsService],
})
export class RoomsModule {}
