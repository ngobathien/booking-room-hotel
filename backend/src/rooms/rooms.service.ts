import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './schemas/room.schema';
import { Model } from 'mongoose';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async createNewRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomModel.create(createRoomDto);
  }

  async findAllRooms(): Promise<Room[]> {
    return this.roomModel.find();
  }

  findRoomById(id: string): Promise<null | string> {
    return this.roomModel.findById(id);
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
