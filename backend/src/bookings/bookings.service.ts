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
} from './schemas/booking.schema';
import { Model } from 'mongoose';
import { Room, RoomDocument } from 'src/rooms/schemas/room.schema';
import {
  RoomType,
  RoomTypeDocument,
} from 'src/room-types/schemas/room-type.schema';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name)
    private bookingModel: Model<BookingDocument>,

    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(RoomType.name) private roomTypeModel: Model<RoomTypeDocument>,
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
      status: { $ne: 'cancelled' },
      checkInDate: { $lt: checkOutDate },
      checkOutDate: { $gt: checkInDate },
    });

    return {
      available: !conflict,
    };
  }

  // lấy tất cả booking
  findAll() {
    return this.bookingModel.find().populate('room').populate('user');
  }

  // lấy booking theo id
  findOne(id: string) {
    return this.bookingModel.findById(id).populate('room').populate('user');
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
