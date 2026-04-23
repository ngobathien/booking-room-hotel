import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@UseGuards(AuthGuard, RolesGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // Tạo mới hoặc cập nhật review
  @Post()
  create(
    @Req() req: Request & { user: { userId: string; role: UserRole } },
    @Body() dto: CreateReviewDto,
  ) {
    return this.reviewsService.createOrUpdate(
      req.user.userId,
      dto,
      req.user.role,
    );
  }

  // Lấy review theo room
  @Get('room/:roomId')
  getByRoom(@Param('roomId') roomId: string) {
    return this.reviewsService.getByRoom(roomId);
  }

  // Lấy trung bình rating theo room
  @Get('room/:roomId/average')
  getAvg(@Param('roomId') roomId: string): any {
    return this.reviewsService.getAverage(roomId);
  }

  // Lấy tất cả review (chỉ admin)
  @Roles(UserRole.ADMIN)
  @Get()
  getAll() {
    return this.reviewsService.getAll();
  }

  // Xóa review (owner hoặc admin)
  @Delete(':id')
  delete(
    @Req() req: Request & { user: { userId: string; role: UserRole } },
    @Param('id') id: string,
  ) {
    return this.reviewsService.delete(req.user.userId, id, req.user.role);
  }
}
