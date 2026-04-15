import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generateBookingCode } from 'src/common/utils/booking/generate-booking-code';
import {
  RoomType,
  RoomTypeDocument,
} from '../room-types/schemas/room-type.schema';
import { Room, RoomDocument } from '../rooms/schemas/room.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingStatus } from './enums/booking-status.enum';
import { BookingStayStatus } from './enums/booking-stay-status.enum';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { GetBookingsQueryDto } from './dto/get-bookings-query.dto';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';
import { NotificationsService } from 'src/notifications/notifications.service';
import { RoomStatus } from 'src/rooms/enums/room-status.enum';

interface BookingStatsAgg {
  _id: BookingStatus;
  count: number;
}

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name)
    private bookingModel: Model<BookingDocument>,

    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(RoomType.name) private roomTypeModel: Model<RoomTypeDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private notificationsGateway: NotificationsGateway,
    private notificationsService: NotificationsService,
  ) {}

  // Kiểm tra phòng có sẵn trong khoảng thời gian hay không
  async checkRoomAvailability(
    roomId: string,
    checkInDate: Date,
    checkOutDate: Date,
  ): Promise<{ available: boolean }> {
    if (!roomId) {
      throw new BadRequestException('roomId is required');
    }

    if (checkOutDate <= checkInDate) {
      throw new BadRequestException('Checkout phải lớn hơn checkin');
    }

    const conflict = await this.bookingModel.findOne({
      room: roomId,
      bookingStatus: { $in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
      checkInDate: { $lt: checkOutDate },
      checkOutDate: { $gt: checkInDate },
    });

    return {
      available: !conflict,
    };
  }

  // Tạo booking mới
  /*   1. Nhận dữ liệu
       2. Validate ngày
       3. Kiểm tra phòng tồn tại
       4. Kiểm tra trùng lịch
       5. Tính số đêm
       6. Tính tổng tiền
       7. Tạo booking */
  async createBooking(createBookingDto: CreateBookingDto, userId: string) {
    // nhận dữ liệu từ DTO, đầu vào
    const { room, checkInDate, checkOutDate, fullName, email, phoneNumber } =
      createBookingDto;

    // validate check-in, check-out
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // ngày check-out phải sau, phải lớn hơn ngày check-in
    if (checkOut <= checkIn) {
      throw new BadRequestException('Ngày checkout phải lớn hơn ngày checkin');
    }

    // ngày check-in, check-out phải lớn hơn hoặc bằng ngày hiện tại
    const today = new Date();

    today.setHours(0, 0, 0, 0); // Đặt giờ phút giây về 00:00:00 để so sánh chỉ ngày
    if (checkIn < today) {
      throw new BadRequestException(
        'Ngày check-in phải là ngày hôm nay hoặc ngày sau đó',
      );
    }
    // Kiểm tra phòng có tồn tại không
    const roomData = await this.roomModel
      .findById(room)
      .populate<{ roomType: RoomTypeDocument }>('roomType');

    if (!roomData) {
      throw new NotFoundException('Phòng không tồn tại');
    }

    if (roomData.status === RoomStatus.MAINTENANCE) {
      throw new BadRequestException('Phòng đang bảo trì, không thể đặt');
    }

    console.log(roomData);
    console.log(roomData.roomType);
    // Kiểm tra trùng lịch
    const overlappingBooking = await this.bookingModel.findOne({
      room,

      // chỉ những booking đang giữ phòng, là bị tính vào overlap
      bookingStatus: {
        $in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
      },

      //
      $or: [
        {
          // checkInDate < newCheckOut
          checkInDate: { $lt: checkOut },
          // checkOutDate > newCheckIn
          checkOutDate: { $gt: checkIn },
        },
      ],
    });

    if (overlappingBooking) {
      throw new BadRequestException('Phòng đã được đặt trong thời gian này');
    }

    // Tính số đêm
    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
    ); // 1000 ms * 60s * 60m * 24h

    // tính tổng tiền
    const totalPrice = nights * roomData.roomType.pricePerNight;

    // Lấy thông tin user để snapshot
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User không tồn tại');
    }

    //
    const bookingCode = generateBookingCode();

    // Tạo booking
    const booking = await this.bookingModel.create({
      bookingCode: bookingCode,
      room,
      user: userId,
      fullName: fullName || user.fullName,
      email: email || user.email,
      phoneNumber: phoneNumber || user.phoneNumber,
      specialRequest: createBookingDto.specialRequest || '',
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalPrice,
      /*  ban đầu khi tạo booking, status sẽ là 'pending', sau đó có thể update
      lên 'confirmed' khi thanh toán thành công,
      hoặc 'cancelled' nếu khách hàng hủy booking */
      bookingStatus: BookingStatus.PENDING,
    });

    // Persist notification to DB and then emit real-time for admin
    try {
      const saved = await this.notificationsService.create({
        title: 'Có đơn mới',
        body: `Mã: ${booking.bookingCode}`,
        type: 'booking',
        data: {
          bookingId: booking._id,
          bookingCode: booking.bookingCode,
          room: booking.room,
          totalPrice: booking.totalPrice,
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate,
        },
      });

      // emit created notification (including id/createdAt)
      this.notificationsGateway.sendNewBooking(saved);
    } catch (err) {
      console.error('Failed to persist/emit newBooking event', err);
    }

    return booking;
  }

  //
  async getBookingStats() {
    const stats: BookingStatsAgg[] = await this.bookingModel.aggregate([
      { $group: { _id: '$bookingStatus', count: { $sum: 1 } } },
    ]);

    const result: {
      total: number;
      confirmed: number;
      pending: number;
      cancelled: number;
      completed: number;
    } = {
      total: await this.bookingModel.countDocuments(),
      confirmed: 0,
      pending: 0,
      cancelled: 0,
      completed: 0,
    };

    stats.forEach((s) => {
      switch (s._id) {
        case BookingStatus.CONFIRMED:
          result.confirmed = s.count;
          break;
        case BookingStatus.PENDING:
          result.pending = s.count;
          break;
        case BookingStatus.CANCELLED:
          result.cancelled = s.count;
          break;
        case BookingStatus.COMPLETED:
          result.completed = s.count;
          break;
      }
    });

    return result;
  }

  // có query
  async findAll(query: GetBookingsQueryDto) {
    const { status, page = 1, limit = 10 } = query;

    const filter: Record<string, any> = {};

    if (status) filter.bookingStatus = status;

    const skip = (page - 1) * limit;

    const [bookings, totalItems] = await Promise.all([
      this.bookingModel
        .find(filter)
        .populate('room')
        .populate('user')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      this.bookingModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      message: 'Get bookings successfully',
      data: bookings,
      pagination: { page, limit, totalItems, totalPages },
    };
  }

  // ================= GET ONE =================
  // lấy booking theo id
  async findOne(id: string) {
    const booking = await this.bookingModel
      .findById(id)
      .populate('room')
      .populate('user');

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return {
      message: 'Get booking successfully',
      data: booking,
    };
  }
  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  // Hủy booking của user
  async cancelBooking(id: string, userId: string) {
    // Tìm booking theo id
    const booking = await this.bookingModel.findById(id);

    // Nếu không tồn tại booking → báo lỗi
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Kiểm tra user hiện tại có phải chủ booking không
    // Chỉ người tạo booking mới có quyền hủy
    if (booking.user.toString() !== userId) {
      throw new BadRequestException('Bạn không thể hủy booking này');
    }

    // Nếu booking đã bị hủy trước đó → không cho hủy nữa
    if (booking.bookingStatus === BookingStatus.CANCELLED) {
      throw new BadRequestException('Booking đã bị hủy trước đó');
    }

    // Nếu khách đã check-in rồi thì không thể hủy
    // Vì khách đã nhận phòng
    if (booking.stayStatus === BookingStayStatus.CHECKED_IN) {
      throw new BadRequestException('Không thể hủy khi đã check-in');
    }

    // Cập nhật trạng thái booking thành CANCELLED
    booking.bookingStatus = BookingStatus.CANCELLED;

    // Lưu thay đổi vào database
    await booking.save();

    // Trả response cho client
    return {
      message: 'Booking cancelled successfully',
      data: booking,
    };
  }

  // Check-in khách (thường do admin / lễ tân thực hiện)
  async checkInBooking(id: string) {
    // Tìm booking theo id
    const booking = await this.bookingModel.findById(id);

    // Nếu booking không tồn tại
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Chỉ cho check-in nếu booking đã được xác nhận (CONFIRMED)
    // Flow đúng: PENDING → CONFIRMED → CHECKED_IN
    if (booking.bookingStatus !== BookingStatus.CONFIRMED) {
      throw new BadRequestException('Booking chưa được xác nhận');
    }

    // Cập nhật trạng thái sang CHECKED_IN (khách đã nhận phòng)
    booking.stayStatus = BookingStayStatus.CHECKED_IN;
    booking.checkedInAt = new Date();

    // Lưu lại database
    await booking.save();

    // Trả kết quả
    return {
      message: 'Check-in successful',
      data: booking,
    };
  }

  // Check-out khách (khách trả phòng)
  async checkOutBooking(id: string) {
    // Tìm booking theo id
    const booking = await this.bookingModel.findById(id);

    // Nếu không tồn tại booking
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Chỉ cho check-out khi khách đã check-in
    // Flow đúng: CONFIRMED → CHECKED_IN → CHECKED_OUT
    if (booking.stayStatus !== BookingStayStatus.CHECKED_IN) {
      throw new BadRequestException('Khách chưa check-in');
    }

    // Cập nhật trạng thái sang CHECKED_OUT (khách đã trả phòng)
    booking.stayStatus = BookingStayStatus.CHECKED_OUT;
    //
    booking.bookingStatus = BookingStatus.COMPLETED;

    booking.checkedOutAt = new Date();
    // Lưu vào database
    await booking.save();

    // Trả kết quả
    return {
      message: 'Check-out successful',
      data: booking,
    };
  }

  // lấy danh sách booking của user hiện tại
  async getMyBookings(userId: string) {
    const bookings = await this.bookingModel
      .find({ user: userId })
      .populate('room')
      .sort({ createdAt: -1 });

    const total = await this.bookingModel.countDocuments({ user: userId });
    return {
      message: 'Get my bookings successfully',
      countMyBookings: total,
      data: bookings,
    };
  }
}
