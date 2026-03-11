import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Booking,
  BookingDocument,
  BookingStatus,
  BookingStayStatus,
} from './schemas/booking.schema';
import { Model } from 'mongoose';
import { Room, RoomDocument } from 'src/rooms/schemas/room.schema';
import {
  RoomType,
  RoomTypeDocument,
} from 'src/room-types/schemas/room-type.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name)
    private bookingModel: Model<BookingDocument>,

    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(RoomType.name) private roomTypeModel: Model<RoomTypeDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
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
      bookingStatus: { $ne: BookingStatus.CANCELLED },
      checkInDate: { $lt: checkOutDate },
      checkOutDate: { $gt: checkInDate },
    });

    return {
      available: !conflict,
    };
  }

  // tạo mã booking
  generateBookingCode() {
    const prefix = process.env.BOOKING_CODE_PREFIX;
    const random = Math.floor(100000 + Math.random() * 900000);
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    return `${prefix}${date}${random}`;
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
    const { room, checkInDate, checkOutDate } = createBookingDto;

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

    // 3️⃣ Tính số đêm
    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
    ); // 1000 ms * 60s * 60m * 24h

    // tính tổng tiền
    const totalPrice = nights * roomData.roomType.pricePerNight;

    // 6️⃣ Lấy thông tin user để snapshot
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User không tồn tại');
    }

    //
    const bookingCode = this.generateBookingCode();
    // 4️⃣ Tạo booking
    return this.bookingModel.create({
      bookingCode,
      room,
      user: userId,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone_number,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalPrice,
      /*  ban đầu khi tạo booking, status sẽ là 'pending', sau đó có thể update
      lên 'confirmed' khi thanh toán thành công,
      hoặc 'cancelled' nếu khách hàng hủy booking */
      bookingStatus: BookingStatus.PENDING,
    });
  }
}
