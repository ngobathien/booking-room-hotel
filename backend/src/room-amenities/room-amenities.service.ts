import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  RoomAmenity,
  RoomAmenityDocument,
} from './schemas/room-amenity.schema';
import { Model, Types } from 'mongoose';
import { CreateRoomAmenityDto } from './dto/create-room-amenity.dto';

@Injectable()
export class RoomAmenitiesService {
  constructor(
    @InjectModel(RoomAmenity.name)
    private readonly model: Model<RoomAmenityDocument>,
  ) {}

  /**
   * Gán tiện ích cho room (replace toàn bộ)
   */
  async create(dto: CreateRoomAmenityDto) {
    const { roomId, amenityIds } = dto;

    // Xóa cũ
    await this.model.deleteMany({ roomId: new Types.ObjectId(roomId) });

    // Tạo mới
    const data = amenityIds.map((id) => ({
      roomId: new Types.ObjectId(roomId),
      amenityId: new Types.ObjectId(id),
    }));

    return this.model.insertMany(data);
  }

  /**
   * Lấy amenities của 1 room
   */
  async findByRoom(roomId: string) {
    return this.model
      .find({ roomId: new Types.ObjectId(roomId) })
      .populate('amenityId'); // lấy thông tin amenity
  }

  /**
   * Lấy amenities của nhiều room (dùng cho bảng Room)
   */
  async findByRoomIds(roomIds: string[]) {
    const objectIds = roomIds.map((id) => new Types.ObjectId(id));
    return this.model
      .find({ roomId: { $in: objectIds } })
      .populate('amenityId'); // populate amenityId luôn
  }

  /**
   * Xóa tất cả amenities của 1 room
   */
  async removeByRoom(roomId: string) {
    return this.model.deleteMany({ roomId: new Types.ObjectId(roomId) });
  }
}
