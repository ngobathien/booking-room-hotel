import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { Amenity, AmenityDocument } from './schemas/amenity.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AmenitiesService {
  constructor(
    @InjectModel(Amenity.name)
    private amenityModel: Model<AmenityDocument>,
  ) {}

  // ✅ CREATE
  async create(dto: CreateAmenityDto) {
    return this.amenityModel.create(dto);
  }

  // ✅ GET ALL
  async findAll() {
    return this.amenityModel.find().sort({ createdAt: -1 });
  }

  // ✅ GET ONE
  async findOne(id: string) {
    const amenity = await this.amenityModel.findById(id);

    if (!amenity) {
      throw new NotFoundException('Amenity not found');
    }

    return amenity;
  }

  // ✅ UPDATE
  async update(id: string, dto: UpdateAmenityDto) {
    const updated = await this.amenityModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!updated) {
      throw new NotFoundException('Amenity not found');
    }

    return updated;
  }

  // ✅ DELETE
  async remove(id: string) {
    const deleted = await this.amenityModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('Amenity not found');
    }

    return { message: 'Deleted successfully' };
  }
}
