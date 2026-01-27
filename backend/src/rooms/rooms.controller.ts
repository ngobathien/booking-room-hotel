import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/schemas/user.schema';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  // tạo room mới
  // admin mới được tạo
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  createNewRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.createNewRoom(createRoomDto);
  }

  // lấy tất cả danh sách room hiện có
  @Get()
  findAllRooms() {
    return this.roomsService.findAllRooms();
  }

  // tìm room theo id của riêng room đó từ database
  @Get(':roomId')
  findRoomById(@Param('roomId') roomId: string) {
    console.log(roomId);
    return this.roomsService.findRoomById(roomId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  // xóa 1 phòng theo id
  @Delete(':id')
  removeRoomsById(@Param('id') id: string) {
    return this.roomsService.removeRoomsById(id);
  }

  // xóa tất cả phòng
  // @Delete(':id')
  // removeAllRooms(@Param('id') id: string) {
  //   return this.roomsService.removeAllRooms(+id);
  // }
}
