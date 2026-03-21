import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from '../bookings/schemas/booking.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { VnpayService } from './gateways/vnpay/vnpay.service';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { PaymentStatus } from './enums/payment-status.enum';
import { PaymentMethod } from './enums/payment-method.enum';
import { AdminQueryPaymentDto } from './dto/admin-query-payment.dto';
import { RevenueByMethodDto } from './dto/revenue-by-method.dto';

interface TotalRevenueAgg {
  totalRevenue: number;
}

@Injectable()
export class PaymentsService {
  constructor(
    private configService: ConfigService,
    private vnpayService: VnpayService,

    @InjectModel(Booking.name)
    private bookingModel: Model<BookingDocument>,

    @InjectModel(Payment.name)
    private paymentModel: Model<PaymentDocument>,
  ) {}

  //
  async createPayment(createPaymentDto: CreatePaymentDto, ip: string) {
    const booking = await this.bookingModel.findById(
      createPaymentDto.bookingId,
    );

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const { method } = createPaymentDto;

    // kiểm tra payment pending trước đó
    const existingPayment = await this.paymentModel.findOne({
      booking: booking._id,
      status: PaymentStatus.PENDING,
    });

    if (existingPayment) {
      const created = new Date(existingPayment.createdAt).getTime();
      const now = new Date().getTime();

      const diff = now - created;

      // 15 phút = 900000 ms
      // chưa quá 15 phút → trả lại link cũ
      if (diff < 900000) {
        return {
          paymentUrl: existingPayment.paymentUrl,
        };
      }

      // nếu quá 15 phút thì hủy payment cũ
      existingPayment.status = PaymentStatus.FAILED;
      await existingPayment.save();
    }

    // Lấy từ ConfigService xem có dùng giây hay phút
    const useSeconds = this.configService.get<boolean>(
      'USE_EXPIRE_SECONDS',
      false,
    );

    // Tạo biến expiryAt là thời điểm payment hết hạn
    const expiryAt = new Date();

    if (useSeconds) {
      // Nếu dùng giây
      // Lấy số giây từ .env, mặc định 30 giây nếu chưa khai báo
      const expireSeconds = this.configService.get<number>(
        'PAYMENT_EXPIRE_SECONDS',
        30,
      );

      // Cộng số giây vào thời điểm hiện tại → thời điểm hết hạn
      expiryAt.setSeconds(expiryAt.getSeconds() + expireSeconds);
    } else {
      // Nếu dùng phút
      // Lấy số phút từ .env, mặc định 15 phút nếu chưa khai báo
      const expireMinutes = this.configService.get<number>(
        'PAYMENT_EXPIRE_MINUTES',
        15,
      );

      // Cộng số phút vào thời điểm hiện tại → thời điểm hết hạn
      expiryAt.setMinutes(expiryAt.getMinutes() + expireMinutes);
    }

    // Tạo payment với expiryAt
    const payment = await this.paymentModel.create({
      booking: booking._id,
      amount: booking.totalPrice,
      method,
      expiryAt,
      status: PaymentStatus.PENDING,
    });

    switch (method) {
      // ============ VNPAY ==============
      case PaymentMethod.VNPAY: {
        // return this.createVNPayPayment(booking, payment._id.toString(), ip);
        const paymentUrl = this.vnpayService.createVNPayPayment(
          booking,
          payment._id.toString(),
          ip,
        );

        payment.paymentUrl = paymentUrl;
        await payment.save();

        return {
          paymentUrl,
          expiryAt: payment.expiryAt,
          remainingTime: Math.floor(
            (payment.expiryAt.getTime() - new Date().getTime()) / 1000,
          ), // giây còn lại
        };
      }

      case PaymentMethod.MOMO:
      // return this.createMomoPayment(booking);
    }
  }

  // Danh sách payment có filter + pagination
  async adminFindAll(query: AdminQueryPaymentDto) {
    const { status, bookingId, method, page = 1, limit = 20 } = query;

    const filter: Record<string, any> = {};

    if (status) filter.status = status;
    if (bookingId) filter.booking = bookingId;
    if (method) filter.method = method;

    const payments = await this.paymentModel
      .find(filter)
      .populate(
        'booking',
        'fullName bookingCode email phoneNumber totalPrice checkInDate checkOutDate',
      )
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await this.paymentModel.countDocuments(filter);

    return { payments, total, page, limit };
  }

  // Lấy chi tiết payment
  async adminFindOne(id: string) {
    const payment = await this.paymentModel.findById(id).populate('booking');
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  // Tổng doanh thu
  async getTotalRevenue() {
    const result = await this.paymentModel.aggregate<TotalRevenueAgg>([
      { $match: { status: PaymentStatus.SUCCESS } }, // chỉ tính payment thành công
      { $group: { _id: null, totalRevenue: { $sum: '$amount' } } },
    ]);

    const totalRevenue = result[0]?.totalRevenue || 0;
    return { totalRevenue };
  }

  // Có thể kết hợp thống kê theo phương thức thanh toán
  async getRevenueByMethod(): Promise<RevenueByMethodDto[]> {
    const result = await this.paymentModel.aggregate<RevenueByMethodDto>([
      { $match: { status: PaymentStatus.SUCCESS } },
      {
        $group: {
          _id: '$method',
          totalRevenue: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);

    return result;
  }
}
