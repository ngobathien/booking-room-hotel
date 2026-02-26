import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from './schemas/room.schema';
import { isValidObjectId, Model, Types } from 'mongoose';
import { SupabaseService } from 'src/config/supabase.config';
import { sanitizeFileName } from 'src/common/utils/sanitizeFileName.utils';

@Injectable()
export class RoomsService {
  private readonly bucketName: string;
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    private readonly supabaseService: SupabaseService,
  ) {
    if (!process.env.BUCKET_NAME) {
      throw new Error('BUCKET_NAME is not defined');
    }

    this.bucketName = process.env.BUCKET_NAME;
  }

  /**
   * Tạo phòng mới + upload nhiều ảnh lên Supabase Storage
   * - Bắt buộc có ít nhất 1 ảnh
   * - Chỉ chấp nhận file image/*
   * - Upload ảnh lên bucket Supabase
   * - Lưu danh sách URL ảnh + thumbnail (ảnh đầu tiên) vào DB
   */
  async createNewRoomWithImages(
    createRoomDto: CreateRoomDto,
    files: Express.Multer.File[],
  ) {
    // Kiểm tra có file upload hay không
    if (!files || files.length === 0) {
      throw new BadRequestException('Phải upload ít nhất 1 ảnh');
    }

    // Lấy client Supabase từ service
    const supabase = this.supabaseService.client;

    // Mảng lưu public URL của các ảnh sau khi upload
    const uploadedUrls: string[] = [];

    // Duyệt từng file được upload
    for (const file of files) {
      // Chỉ cho phép upload ảnh
      if (!file.mimetype.startsWith('image/')) {
        throw new BadRequestException(
          `File ${file.originalname} không phải ảnh`,
        );
      }

      // Làm sạch tên file (tránh ký tự đặc biệt)
      const safeName = sanitizeFileName(file.originalname);

      /**
       * Tạo đường dẫn lưu ảnh trên Supabase
       * Ví dụ:
       * rooms/101/1707123456789-room.jpg
       */
      const path = `rooms/${createRoomDto.roomNumber}-room/${Date.now()}-${safeName}`;

      // Upload file buffer lên Supabase Storage
      const { error } = await supabase.storage
        .from(this.bucketName)
        .upload(path, file.buffer, {
          contentType: file.mimetype,
        });

      // Nếu upload lỗi → dừng lại ngay
      if (error) {
        throw new BadRequestException(error.message ?? 'Upload ảnh thất bại');
      }

      // Lấy public URL của ảnh vừa upload, để lưu url này vào database
      const { data } = supabase.storage
        .from(this.bucketName)
        .getPublicUrl(path);

      // Không lấy được URL → báo lỗi
      if (!data?.publicUrl) {
        throw new BadRequestException('Không lấy được public URL');
      }

      // Lưu URL vào mảng images
      uploadedUrls.push(data.publicUrl);
    }

    /**
     * Tạo room trong database
     * - images: toàn bộ ảnh
     * - thumbnail: ảnh đầu tiên (ảnh đại diện)
     */
    return this.roomModel.create({
      ...createRoomDto,
      images: uploadedUrls,
      thumbnail: uploadedUrls[0],
    });
  }

  // tìm all dữ liệu phòng
  async findAllRooms(query: any) {
    const {
      keyword,
      status,
      roomType,
      capacity,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sort,
    } = query;

    const filter: any = {};

    /* ======================
     1️⃣ SEARCH
  ====================== */
    if (keyword) {
      filter.roomNumber = { $regex: keyword, $options: 'i' };
    }

    /* ======================
     2️⃣ FILTER
  ====================== */

    if (status) {
      filter.status = status;
    }

    if (roomType) {
      if (!isValidObjectId(roomType)) {
        throw new BadRequestException('Room type id không hợp lệ');
      }
      filter.roomType = roomType;
    }

    /* ======================
     3️⃣ QUERY BUILDER
  ====================== */

    let queryBuilder = this.roomModel.find(filter).populate({
      path: 'roomType',
      match: {
        ...(capacity && { capacity: Number(capacity) }),
        ...(minPrice && { pricePerNight: { $gte: Number(minPrice) } }),
        ...(maxPrice && { pricePerNight: { $lte: Number(maxPrice) } }),
      },
    });

    /* ======================
     4️⃣ SORT
  ====================== */

    if (sort) {
      switch (sort) {
        case 'price_asc':
          queryBuilder = queryBuilder.sort({ 'roomType.pricePerNight': 1 });
          break;

        case 'price_desc':
          queryBuilder = queryBuilder.sort({ 'roomType.pricePerNight': -1 });
          break;
      }
    }

    /* ======================
     5️⃣ PAGINATION
  ====================== */

    const skip = (Number(page) - 1) * Number(limit);

    queryBuilder = queryBuilder.skip(skip).limit(Number(limit));

    const rooms = await queryBuilder.exec();

    // Loại những room bị null do match populate
    const filteredRooms = rooms.filter((room) => room.roomType !== null);

    const total = await this.roomModel.countDocuments(filter);

    return {
      total,
      page: Number(page),
      limit: Number(limit),
      data: filteredRooms,
    };
  }

  // new thử nghiệm tìm all dữ liệu phòng

  // tìm dữ liệu phòng theo một _id cụ thể
  async findRoomById(roomId: string): Promise<RoomDocument> {
    // check sai _id gửi lên
    if (!isValidObjectId(roomId)) {
      throw new BadRequestException('Room id không hợp lệ');
    }
    const roomData = await this.roomModel.findById(roomId).populate('roomType');

    // check dữ liệu room có hay không
    if (!roomData) {
      throw new NotFoundException('Không tìm thấy dữ liệu phòng');
    }
    return roomData;
  }

  updateRoom(roomId: string, updateRoomDto: UpdateRoomDto) {
    // check sai _id gửi lên
    if (!isValidObjectId(roomId)) {
      throw new BadRequestException('Room id không hợp lệ');
    }
    const updatedRoom = this.roomModel.findByIdAndUpdate(
      roomId,
      updateRoomDto,
      {
        new: true,
      },
    );

    if (!updateRoomDto) {
      throw new NotFoundException('Không tìm thấy dữ liệu phòng để cập nhật');
    }
    return updatedRoom;
  }

  // xóa 1 phòng theo id
  async removeRoomById(roomId: string): Promise<{ message: string }> {
    if (!isValidObjectId(roomId)) {
      throw new BadRequestException('Room id không hợp lệ');
    }
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
