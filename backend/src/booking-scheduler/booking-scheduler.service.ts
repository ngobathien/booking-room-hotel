// booking-scheduler/booking-scheduler.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from '../bookings/schemas/booking.schema';
import { Payment, PaymentDocument } from '../payments/schemas/payment.schema';
import { BookingStatus } from '../bookings/enums/booking-status.enum';
import { PaymentStatus } from '../payments/enums/payment-status.enum';
import { MailService } from '../services/mail.service';

@Injectable()
export class BookingSchedulerService {
  private readonly logger = new Logger(BookingSchedulerService.name);

  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    private mailService: MailService,
  ) {}

  // Cron chạy mỗi 30 giây để test
  @Cron(CronExpression.EVERY_5_SECONDS)
  async cancelExpiredPayments() {
    const now = new Date();

    // ⚡ Thêm log để debug
    this.logger.log(`Now: ${now.toISOString()}`);

    // 1️⃣ tìm payment PENDING mà đã quá expiryAt
    const expiredPayments = await this.paymentModel.find({
      status: PaymentStatus.PENDING,
      expiryAt: { $lt: now },
    });

    this.logger.log(`Expired payments: ${expiredPayments.length}`); // ⚡ log số lượng

    for (const payment of expiredPayments) {
      // Hủy payment
      payment.status = PaymentStatus.FAILED;
      await payment.save();

      // Hủy booking nếu chưa confirmed
      const booking = await this.bookingModel.findById(payment.booking);
      if (!booking) continue;

      if (booking.bookingStatus === BookingStatus.PENDING) {
        booking.bookingStatus = BookingStatus.CANCELLED;
        await booking.save();
        this.logger.log(
          `Booking ${booking._id.toString()} auto-cancelled due to expired payment`,
        );
      }
    }
  }
}
