import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPassworDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SignInDto } from './dto/sign-in-auth.dto';
import { SignUpDto } from './dto/sign-up-auth.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { AuthGuard } from './guards/auth.guard';

import { ConfigService } from '@nestjs/config';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Profile } from 'passport-google-oauth20';

import type { Request, Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}

  // đăng nhập
  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // signIn(@Body() signInDto: SignInDto) {
  //   return this.authService.signIn(signInDto);
  // }

  // đăng nhập trả về refreshToken với cookie
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.signIn(signInDto);

    res.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: false, // true khi deploy https
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      accessToken: data.accessToken,
      user: data.user,
    };
  }

  // đăng ký
  @Post('register')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  // xác định xem đã đăng nhập hay chưa, và là ai
  @UseGuards(AuthGuard)
  @Get('profile')
  @Get('profile')
  async getProfile(@Req() req: Request & { user: { userId: string } }) {
    // const data = await this.usersService.findById(req.user.sub);
    // console.log('data từ database', data);
    // console.log('data từ database', req.infoUser);
    // return req.infoUser;

    console.log('data từ database', req.user.userId);
    return this.usersService.findByIdPublic(req.user.userId);
    // return this.usersService.findById(req.user.sub);
  }

  // @Post('refresh-token')
  // refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
  //   return this.authService.refreshTokens(refreshTokenDto);
  // }

  @Post('refresh-token')
  refreshToken(@Req() req: Request) {
    const refreshToken = req.cookies.refreshToken;

    return this.authService.refreshTokens(refreshToken);
  }

  @UseGuards(AuthGuard)
  @Put('change-password')
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: Request & { user: { userId: string } },
  ) {
    const { oldPassword, newPassword } = changePasswordDto;
    return this.authService.changePassword(
      req.user.userId,
      oldPassword,
      newPassword,
    );
  }

  @Post('forgot-password')
  forgotPassword(@Body() forgotPassworDto: ForgotPassworDto) {
    return this.authService.forgotPassword(forgotPassworDto.email);
  }

  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.resetToken,
      resetPasswordDto.newPassword,
    );
  }

  @Post('verify-otp')
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  @Post('resend-otp')
  resendOtp(@Body('email') email: string) {
    return this.authService.resendOtp(email);
  }

  @Get('google')
  @UseGuards(PassportAuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(PassportAuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: Request & { user: Profile },
    @Res() res: Response,
  ) {
    const url_frontend = this.configService.get<string>('URL_CLIENT')!;

    const data = await this.authService.googleLogin(req.user);

    return res.redirect(
      `${url_frontend}/google-success?token=${data.accessToken}`,
    );
  }
}
