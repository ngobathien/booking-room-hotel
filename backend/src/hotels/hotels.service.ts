import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hotel, HotelDocument } from './schemas/hotel.schema';
import { Model } from 'mongoose';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}

  create(data: any) {
    return this.hotelModel.create(data);
  }

  findAll() {
    return this.hotelModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const hotel = await this.hotelModel.findById(id);
    if (!hotel) throw new NotFoundException('Không tìm thấy hotel');
    return hotel;
  }

  async update(id: string, data: any) {
    const hotel = await this.hotelModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!hotel) throw new NotFoundException('Hotel not found');
    return hotel;
  }

  async remove(id: string) {
    const hotel = await this.hotelModel.findByIdAndDelete(id);
    if (!hotel) throw new NotFoundException('Hotel not found');
    return { message: 'Deleted' };
  }
}
