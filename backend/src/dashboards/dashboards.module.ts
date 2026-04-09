import { Module } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { DashboardsController } from './dashboards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from 'src/rooms/schemas/room.schema';
import {
  RoomType,
  RoomTypeSchema,
} from 'src/room-types/schemas/room-type.schema';
import { Booking, BookingSchema } from 'src/bookings/schemas/booking.schema';
import { Review, ReviewSchema } from 'src/reviews/schemas/review.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Payment, PaymentSchema } from 'src/payments/schemas/payment.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    // RoomTypesModule,
    UsersModule,
    // ConfigModule,
    // BookingsModule,

    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: RoomType.name, schema: RoomTypeSchema },
      { name: Booking.name, schema: BookingSchema },
      { name: Review.name, schema: ReviewSchema },
      { name: User.name, schema: UserSchema },
      { name: Payment.name, schema: PaymentSchema },
    ]),
  ],
  controllers: [DashboardsController],
  providers: [DashboardsService],
})
export class DashboardsModule {}
