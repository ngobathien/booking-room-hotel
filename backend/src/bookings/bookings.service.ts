import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { Model, Types } from 'mongoose';
import { Room, RoomDocument } from '../rooms/schemas/room.schema';
import {
  RoomType,
  RoomTypeDocument,
} from '../room-types/schemas/room-type.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { BookingStatus } from './enums/booking-status.enum';
import { BookingStayStatus } from './enums/booking-stay-status.enum';
import {
  BookingItem,
  BookingItemDocument,
} from 'src/booking-items/schemas/booking-item.schema';
import { generateBookingCode } from 'src/common/utils/booking/generate-booking-code';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name)
    private bookingModel: Model<BookingDocument>,

    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(RoomType.name) private roomTypeModel: Model<RoomTypeDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,

    @InjectModel(BookingItem.name)
    private bookingItemModel: Model<BookingItemDocument>,
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

    // const conflict = await this.bookingModel.findOne({
    //   room: roomId,
    //   bookingStatus: { $in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
    //   checkInDate: { $lt: checkOutDate },
    //   checkOutDate: { $gt: checkInDate },
    // });

    // return {
    //   available: !conflict,
    // };

    const conflict = await this.bookingItemModel
      .findOne({
        room: roomId,
      })
      .populate({
        path: 'booking',
        match: {
          bookingStatus: {
            $in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
          },
          checkInDate: { $lt: checkOutDate },
          checkOutDate: { $gt: checkInDate },
        },
      });

    return {
      available: !conflict || !conflict.booking,
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
    const { rooms, checkInDate, checkOutDate, fullName, email, phoneNumber } =
      createBookingDto;

    if (!rooms || rooms.length === 0) {
      throw new BadRequestException('Phải chọn ít nhất 1 phòng');
    }
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

    // Lấy thông tin user để snapshot
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User không tồn tại');
    }

    // tạo mã booking
    const bookingCode = generateBookingCode();

    // tạo booking
    const booking = await this.bookingModel.create({
      bookingCode: bookingCode,
      user: userId,
      fullName: fullName || user.fullName,
      email: email || user.email,
      phoneNumber: phoneNumber || user.phoneNumber,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalPrice: 0,
      bookingStatus: BookingStatus.PENDING,
    });

    // khởi tạo tổng tiền booking ban đầu = 0
    let totalPrice = 0;

    //
    for (const roomId of rooms) {
      // Kiểm tra từng phòng có tồn tại không
      const room = await this.roomModel
        .findById(roomId)
        .populate<{ roomType: RoomTypeDocument }>('roomType');
      if (!room) {
        throw new NotFoundException('Phòng không tồn tại');
      }

      // Kiểm tra trùng lịch
      // const overlappingBooking = await this.bookingItemModel.findOne({
      //   roomId,
      //   // chỉ những booking đang giữ phòng, là bị tính vào overlap
      //   bookingStatus: {
      //     $in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
      //   },
      //   //
      //   $or: [
      //     {
      //       // checkInDate < newCheckOut
      //       checkInDate: { $lt: checkOut },
      //       // checkOutDate > newCheckIn
      //       checkOutDate: { $gt: checkIn },
      //     },
      //   ],
      // });
      const overlappingBooking = await this.bookingItemModel
        .findOne({
          room: roomId,
        })
        .populate({
          path: 'booking',
          match: {
            bookingStatus: {
              $in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
            },
            checkInDate: { $lt: checkOut },
            checkOutDate: { $gt: checkIn },
          },
        });

      if (overlappingBooking && overlappingBooking.booking) {
        throw new BadRequestException('Phòng đã được đặt trong thời gian này');
      }

      // Tính số đêm
      const nights = Math.ceil(
        (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
      ); // 1000 ms * 60s * 60m * 24h

      // tính tiền từng phòng
      const price = nights * room.roomType.pricePerNight;

      totalPrice = totalPrice + price;

      // tạo booking item
      await this.bookingItemModel.create({
        booking: booking._id,
        room: roomId,
        price,
      });
    }

    // Update booking
    booking.totalPrice = totalPrice;
    await booking.save();

    return booking;
  }

  // ================= GET ALL =================
  async findAll() {
    const bookings = await this.bookingModel
      .find()
      .populate('user')
      .sort({ createdAt: -1 });

    return {
      message: 'Get all bookings successfully',
      data: bookings,
    };
  }

  // ================= GET ONE =================
  async findOne(id: string) {
    // Tìm booking theo id và populate thông tin user
    const booking = await this.bookingModel.findById(id).populate('user');

    if (!booking) {
      throw new NotFoundException('Không tìm thấy booking');
    }

    // Lấy các booking item liên quan, populate room + roomType
    const items = await this.bookingItemModel
      .find({ booking: new Types.ObjectId(id) })
      .populate({
        path: 'room',
        populate: { path: 'roomType' }, // lấy luôn thông tin loại phòng
      });

    return {
      message: 'Get booking successfully',
      data: {
        booking,
        items,
      },
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

    // cập nhật các items
    await this.bookingItemModel.updateMany(
      {
        booking: id,
      },
      {
        stayStatus: BookingStayStatus.CHECKED_IN,
        checkedInAt: new Date(),
      },
    );

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

    await this.bookingItemModel.updateMany(
      { booking: id },
      {
        stayStatus: BookingStayStatus.CHECKED_OUT,
        checkedOutAt: new Date(),
      },
    );

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
      .sort({ createdAt: -1 });

    const result = await Promise.all(
      bookings.map(async (booking) => {
        const items = await this.bookingItemModel
          .find({ booking: booking._id })
          .populate('room');

        return {
          booking,
          items,
        };
      }),
    );

    return {
      message: 'Get my bookings successfully',
      data: result,
    };
  }
}
