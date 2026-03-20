import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SupabaseService } from 'src/config/supabase.config';
import { sanitizeFileName } from 'src/common/utils/sanitizeFileName.utils';

@Injectable()
export class UsersService {
  private readonly bucketName: string;

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private readonly supabaseService: SupabaseService,
  ) {
    if (!process.env.SUPABASE_BUCKET_AVATARS) {
      throw new Error('SUPABASE_BUCKET_AVATARS is not defined');
    }

    this.bucketName = process.env.SUPABASE_BUCKET_AVATARS;
  }

  // Upload avatar cho user
  async uploadAvatar(
    userId: string,
    file: Express.Multer.File,
  ): Promise<string> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User không tồn tại');

    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('File phải là ảnh');
    }

    const safeName = sanitizeFileName(file.originalname);
    const path = `avatars/user_${userId}/${Date.now()}-${safeName}`;

    const supabase = this.supabaseService.client;

    const { error } = await supabase.storage
      .from(this.bucketName)
      .upload(path, file.buffer, {
        contentType: file.mimetype,
        upsert: true, // ghi đè nếu đã có
      });

    if (error) throw new BadRequestException(error.message);

    const { data } = supabase.storage.from(this.bucketName).getPublicUrl(path);

    // Lưu URL avatar vào DB
    user.avatar = data.publicUrl;
    await user.save();

    return data.publicUrl;
  }

  // tạo user
  async create(dto: CreateUserDto): Promise<UserDocument> {
    return this.userModel.create(dto);
  }

  // admin lấy tất cả list user (KHÔNG trả password)
  async getAllUsers(): Promise<User[]> {
    return this.userModel
      .find()
      .select('-password')
      .sort({ createdAt: -1 })
      .exec();
  }

  // dùng cho AUTH (cần password)
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // dùng cho profile / API public
  async findByIdPublic(id: string): Promise<User | null> {
    return this.userModel.findById(id).select('-password').exec();
  }

  // users.service.ts
  // cho việc đổi mật khẩu
  async findByIdWithPassword(
    id: string | Types.ObjectId,
  ): Promise<UserDocument | null> {
    return this.userModel.findById(id);
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .select('-password')
      .exec();
  }

  async removeUser(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
