import { Module } from '@nestjs/common';
import { AiChatbotService } from './ai_chatbot.service';
import { AiChatbotController } from './ai_chatbot.controller';
import { Room, RoomSchema } from '../rooms/schemas/room.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from '../payments/schemas/payment.schema';
import { Booking, BookingSchema } from '../bookings/schemas/booking.schema';
import { UsersModule } from '../users/users.module';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: Payment.name, schema: PaymentSchema },
      { name: Booking.name, schema: BookingSchema },
    ]),
    UsersModule,
    RoomsModule,
  ],
  controllers: [AiChatbotController],
  providers: [AiChatbotService],
})
export class AiChatbotModule {}
