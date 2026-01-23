import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in-auth.dto';
import { SignUpDto } from './dto/sign-up-auth.dto';
import { AuthGuard } from './guards/auth.guard';
import { UsersService } from 'src/users/users.service';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // đăng nhập
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.singIn(signInDto);
  }

  // đăng ký
  @Post('register')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.singUp(signUpDto);
  }

  // xác định xem đã đăng nhập hay chưa, và là ai
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    console.log('payload', req.user);

    // const data = await this.usersService.findById(req.user.sub);
    // console.log('data từ database', data);
    return req.user;
    // return this.usersService.findById(req.user.sub);
  }
}
