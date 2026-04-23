import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { UserRole } from '../users/schemas/user.schema';
// Define type cho kết quả thống kê
interface ReviewStats {
  _id?: Types.ObjectId;
  averageRating: number;
  totalReviews: number;
}
@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name)
    private reviewModel: Model<ReviewDocument>,
  ) {}

  // Tạo mới hoặc cập nhật review
  async createOrUpdate(userId: string, dto: CreateReviewDto, role: UserRole) {
    const { roomId, rating, comment } = dto;

    // Nếu admin muốn chỉnh sửa review bất kỳ (truyền thêm dto.reviewId)
    if (role === UserRole.ADMIN && dto['reviewId']) {
      return this.reviewModel.findByIdAndUpdate(
        dto['reviewId'],
        { rating, comment },
        { new: true },
      );
    }

    // User bình thường hoặc tạo mới
    return this.reviewModel.findOneAndUpdate(
      {
        userId: new Types.ObjectId(userId),
        roomId: new Types.ObjectId(roomId),
      },
      {
        rating,
        comment,
        isDeleted: false,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );
  }

  // Lấy review theo room
  async getByRoom(roomId: string) {
    return this.reviewModel
      .find({ roomId: new Types.ObjectId(roomId), isDeleted: false })
      .populate('userId', 'fullName avatar')
      .sort({ createdAt: -1 })
      .exec();
  }

  // Lấy trung bình rating của phòng
  async getAverage(roomId: string): Promise<ReviewStats> {
    const stats: ReviewStats[] = await this.reviewModel.aggregate([
      {
        $match: {
          roomId: new Types.ObjectId(roomId),
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: '$roomId',
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    return stats.length > 0 ? stats[0] : { averageRating: 0, totalReviews: 0 };
  }

  // Lấy tất cả review (admin)
  async getAll() {
    return this.reviewModel
      .find({ isDeleted: false })
      .populate('userId', 'fullName avatar')
      .sort({ createdAt: -1 })
      .exec();
  }

  // Xóa review (owner hoặc admin)
  async delete(userId: string, reviewId: string, role: UserRole) {
    const review = await this.reviewModel.findById(reviewId);

    if (!review) throw new NotFoundException('Không tìm thấy đánh giá');

    if (role !== UserRole.ADMIN && review.userId.toString() !== userId) {
      throw new ForbiddenException('Bạn không có quyền xóa đánh giá này');
    }

    review.isDeleted = true;
    return await review.save();
  }
}
