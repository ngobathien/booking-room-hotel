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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from './schemas/user.schema';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // tạo user mới
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // lấy tất cả user
  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.usersService.getAllUsers();
  }

  // @Get(':email')
  // findByEmail(@Param('email') email: string) {
  //   return this.usersService.findByEmail(email);
  // }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}
