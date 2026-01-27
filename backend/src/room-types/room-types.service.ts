import { Injectable } from '@nestjs/common';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomType, RoomTypeDocument } from './schemas/room-type.schema';

@Injectable()
export class RoomTypesService {
  constructor(
    @InjectModel(RoomType.name) private roomTypeModel: Model<RoomTypeDocument>,
  ) {}

  // tạo loại phòng mới
  async createRoomType(
    createRoomTypeDto: CreateRoomTypeDto,
  ): Promise<RoomTypeDocument> {
    const roomTypeData = await this.roomTypeModel.create(createRoomTypeDto);
    console.log(roomTypeData);
    return roomTypeData;
  }

  // tìm all loại phòng mới
  findAll() {
    return this.roomTypeModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} roomType`;
  }

  update(id: number, updateRoomTypeDto: UpdateRoomTypeDto) {
    return `This action updates a #${id} roomType`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomType`;
  }
}
