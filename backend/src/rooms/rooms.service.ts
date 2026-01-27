import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from './schemas/room.schema';
import { isValidObjectId, Model, ObjectId } from 'mongoose';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  async createNewRoom(createRoomDto: CreateRoomDto): Promise<RoomDocument> {
    return this.roomModel.create(createRoomDto);
  }

  // tìm all dữ liệu phòng
  async findAllRooms(): Promise<RoomDocument[]> {
    return this.roomModel.find();
  }

  // tìm dữ liệu phòng theo một _id cụ thể
  async findRoomById(roomId: string): Promise<RoomDocument> {
    const roomData = await this.roomModel.findById(roomId);

    // check sai _id gửi lên
    if (!isValidObjectId(roomId)) {
      throw new BadRequestException('Room id không hợp lệ');
    }

    // check dữ liệu room có hay không
    if (!roomData) {
      throw new NotFoundException('Không tìm thấy dữ liệu phòng');
    }
    return roomData;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  // xóa 1 phòng theo id
  async removeRoomsById(roomId: string): Promise<{ message: string }> {
    const roomData = await this.roomModel.findByIdAndDelete(roomId);

    if (!roomData) {
      throw new NotFoundException('Không tìm thấy dữ liệu phòng để xóa');
    }
    return {
      message: 'Xóa phòng thành công',
    };
  }

  // xóa tất cả phòng được chọn
  // removeAllRooms(id: number) {
  //   return this.roomModel.findByIdAndDelete(id);
  // }
}
