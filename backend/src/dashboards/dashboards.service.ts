import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from '../bookings/schemas/booking.schema';
import { Payment, PaymentDocument } from '../payments/schemas/payment.schema';
import { Review, ReviewDocument } from '../reviews/schemas/review.schema';
import {
  RoomType,
  RoomTypeDocument,
} from '../room-types/schemas/room-type.schema';
import { Room, RoomDocument } from '../rooms/schemas/room.schema';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class DashboardsService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(RoomType.name) private roomTypeModel: Model<RoomTypeDocument>,
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}
  async getOverview() {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    /* ======================
     1. ROOM STATS
  ====================== */
    const roomStats = await this.roomModel.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const roomMap = Object.fromEntries(roomStats.map((s) => [s._id, s.count]));

    const totalRooms = Object.values(roomMap).reduce(
      (a: number, b: number) => a + b,
      0,
    );

    /* ======================
     2. BOOKING STATS
  ====================== */
    const totalBookings = await this.bookingModel.countDocuments({
      status: { $ne: 'cancelled' },
    });

    const todayBookings = await this.bookingModel.countDocuments({
      createdAt: { $gte: todayStart, $lte: todayEnd },
    });

    /* ======================
     3. REVENUE
  ====================== */
    const revenueAgg = await this.paymentModel.aggregate([
      { $match: { status: 'SUCCESS' } },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);

    const todayRevenueAgg = await this.paymentModel.aggregate([
      {
        $match: {
          status: 'SUCCESS',
          createdAt: { $gte: todayStart, $lte: todayEnd },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);

    /* ======================
     4. USERS
  ====================== */
    const totalUsers = await this.userModel.countDocuments();

    const newUsersToday = await this.userModel.countDocuments({
      createdAt: { $gte: todayStart, $lte: todayEnd },
    });

    /* ======================
     5. REVIEWS
  ====================== */
    const reviewAgg = await this.reviewModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          avgRating: { $avg: '$rating' },
        },
      },
    ]);

    /* ======================
     6. ROOM TYPE
  ====================== */
    const totalRoomTypes = await this.roomTypeModel.countDocuments();

    return {
      rooms: {
        total: totalRooms,
        available: roomMap.AVAILABLE || 0,
        occupied: roomMap.OCCUPIED || 0,
        booked: roomMap.BOOKED || 0,
        maintenance: roomMap.MAINTENANCE || 0,
      },

      bookings: {
        total: totalBookings,
        today: todayBookings,
      },

      revenue: {
        total: revenueAgg[0]?.total || 0,
        today: todayRevenueAgg[0]?.total || 0,
      },

      users: {
        total: totalUsers,
        newToday: newUsersToday,
      },

      reviews: {
        total: reviewAgg[0]?.total || 0,
        avgRating: reviewAgg[0]?.avgRating || 0,
      },

      roomTypes: {
        total: totalRoomTypes,
      },
    };
  }

  // dashboards.service.ts
  async getRevenueChart(from?: string, to?: string) {
    const fromDate = from ? new Date(from) : new Date();
    fromDate.setDate(fromDate.getDate() - 14);

    const toDate = to ? new Date(to) : new Date();

    return this.paymentModel.aggregate([
      {
        $match: {
          status: 'SUCCESS',
          createdAt: { $gte: fromDate, $lte: toDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          revenue: { $sum: '$amount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  }

  async getBookingChart(from?: string, to?: string) {
    const fromDate = from ? new Date(from) : new Date();
    fromDate.setDate(fromDate.getDate() - 14);

    const toDate = to ? new Date(to) : new Date();

    return this.bookingModel.aggregate([
      {
        $match: {
          createdAt: { $gte: fromDate, $lte: toDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          bookings: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  }
}
