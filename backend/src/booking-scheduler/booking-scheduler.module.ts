import { Module } from '@nestjs/common';
import { BookingSchedulerService } from './booking-scheduler.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from '../bookings/schemas/booking.schema';
import { Payment, PaymentSchema } from '../payments/schemas/payment.schema';
import { MailService } from '../services/mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Payment.name, schema: PaymentSchema },
    ]),
  ],
  providers: [BookingSchedulerService, MailService],
})
export class BookingSchedulerModule {}
