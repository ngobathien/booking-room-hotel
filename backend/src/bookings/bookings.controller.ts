import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/schemas/user.schema';
/* 
GET    /bookings/check-availability x
POST   /bookings x
GET    /bookings x 
GET    /bookings/my-bookings x
GET    /bookings/:id 
PATCH  /bookings/:id/cancel
PATCH  /bookings/:id/confirm
PATCH  /bookings/:id/check-in
PATCH  /bookings/:id/check-out */
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // Kiểm tra chi tiết một phòng có sẵn trong khoảng thời gian hay không
  @Get('check-availability')
  async checkRoomAvailability(
    @Query('roomId') roomId: string,
    @Query('checkInDate') checkInDate: string,
    @Query('checkOutDate') checkOutDate: string,
  ): Promise<{ available: boolean }> {
    return this.bookingsService.checkRoomAvailability(
      roomId,
      new Date(checkInDate),
      new Date(checkOutDate),
    );
  }

  // tạo booking mới
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  createBooking(@Body() dto: CreateBookingDto, @Req() req) {
    return this.bookingsService.createBooking(dto, req.user.userId);
  }
}
