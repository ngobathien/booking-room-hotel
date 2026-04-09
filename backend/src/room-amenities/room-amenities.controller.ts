import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Query,
} from '@nestjs/common';
import { RoomAmenitiesService } from './room-amenities.service';
import { CreateRoomAmenityDto } from './dto/create-room-amenity.dto';

@Controller('room-amenities')
export class RoomAmenitiesController {
  constructor(private readonly service: RoomAmenitiesService) {}

  /**
   * Gán tiện ích cho room
   */
  @Post()
  create(@Body() dto: CreateRoomAmenityDto) {
    return this.service.create(dto);
  }

  /**
   * Lấy danh sách tiện ích của 1 room
   */
  @Get(':roomId')
  findByRoom(@Param('roomId') roomId: string) {
    return this.service.findByRoom(roomId);
  }

  /**
   * Lấy danh sách amenities của nhiều room (query: roomIds=id1,id2,...)
   */
  @Get()
  findByRoomIds(@Query('roomIds') roomIds: string) {
    const idsArray = roomIds.split(',');
    return this.service.findByRoomIds(idsArray);
  }

  /**
   * Xóa tất cả tiện ích của room
   */
  @Delete(':roomId')
  removeByRoom(@Param('roomId') roomId: string) {
    return this.service.removeByRoom(roomId);
  }
}
