import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from './dto/sign-in-auth.dto';
import { SignUpDto } from './dto/sign-up-auth.dto';

import * as bcrypt from 'bcrypt';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshToken } from './schemas/refresh-token.schema';
import { randomUUID } from 'crypto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    // thêm model User
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,

    // thêm model RefreshToken
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
  ) {}

  // đăng nhập
  // signInDto: CreateAuthDto là để check dữ liệu từ client gửi lên có hợp lệ dữ liệu không
  async signIn(signInDto: SignInDto) {
    console.log('signInDto:', signInDto);

    // nhận email và password từ client gửi lên thông qua signInDto
    const { email, password } = signInDto;

    // kiểm tra email có tồn tại không, dùng email để tìm user
    const user = await this.usersService.findByEmail(email);
    // console.log(user?.email);

    // nếu không có user hoặc mật khẩu không đúng thì báo lỗi
    if (!user) {
      throw new UnauthorizedException('Email không đúng hoặc không tồn tại');
    }

    /* so sánh password từ client gửi lên với password của hệ thống lưu ở database 
     thông qua user được tìm thấy */
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Mật khẩu không đúng');
    }

    // payload này dùng để mã hóa trong JWT
    const payload = {
      sub: user._id.toString(), // dùng để tìm dữ liệu khi decode payload dựa vào cái _id này
      // email: user.email,
      // role: user.role,
    };
    // console.log("payload  ",payload);

    // ====================== access_token ======================
    const access_token = await this.jwtService.signAsync(payload);
    // console.log('access_token: ', access_token);

    // ====================== refreshToken ======================
    const refreshToken = randomUUID();
    // console.log('refreshToken:', refreshToken);

    console.log('user._id', user._id);
    // Chỉ xoá những document “có chứa userId = user._id, không phải xóa user có _id đó nghe
    // XOÁ TOÀN BỘ refresh token cũ của user
    await this.refreshTokenModel.deleteMany({
      userId: user._id,
    });

    // ====================== tạo refreshToken mới lưu vào database ======================
    await this.refreshTokenModel.create({
      userId: user._id,
      token: refreshToken,
      // thời gian hết hạn của refresh token
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // nếu đúng thì trả về thông tin user
    return {
      message: 'Đăng nhập thành công',
      access_token,
      refreshToken,
    };
  }

  // đăng ký
  async signUp(signUpDto: SignUpDto) {
    console.log('signUpDto:', signUpDto);

    const { password } = signUpDto;
    // =============================bcrypt mật khẩu==================================
    const saltOrRounds = 10;
    // cho password vào hàm bcryp.hash để mã hóa
    // salt là chuỗi ngẫu nhiên được thêm vào trước khi mã hóa để tăng cường bảo mật
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    // console.log(`Hash: ${hashedPassword}`);

    const user = await this.usersService.create({
      ...signUpDto,
      password: hashedPassword,
    });

    return { message: 'Đăng ký thành công', user };
  }

  // refresh token
  // lấy refresh token mới, đây là dùng để lưu refresh toke
  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    // Nhận refresh token từ client
    const { token } = refreshTokenDto;

    // tìm refresh token trong database
    const stored = await this.refreshTokenModel.findOne({
      // tìm mã token hiện tại, là một chuỗi chẳng hạn kèm với thời gian hết hạn của refresh token đó
      token,
      expiresAt: { $gt: new Date() },
    });
    console.log('stored: ', stored?._id);

    if (!stored) throw new UnauthorizedException();

    const user = await this.userModel.findById(stored.userId);

    const payload = {
      sub: user?._id.toString(),
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  // đăng xuất
  // async signOut() {
  //   // logic đăng xuất (nếu cần thiết, ví dụ: thu hồi token)
  //   return { message: 'Đăng xuất thành công' };
  // }
  // quên mật khẩu

  // đổi mật khẩu
  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    // nhận email và password từ client gửi lên thông qua signInDto

    // kiểm tra email có tồn tại không, dùng email để tìm user
    const user = await this.usersService.findByIdWithPassword(userId);

    if (!user) throw new NotFoundException('User not found...');

    // so sánh mật khẩu cũ với mật khẩu trong database
    const comparePassword = await bcrypt.compare(oldPassword, user.password);

    if (!comparePassword) {
      throw new UnauthorizedException('Mật khẩu không đúng');
    }

    // thay đổi mật khẩu
    const newHashedPassWord = await bcrypt.hash(newPassword, 10);

    user.password = newHashedPassWord;

    await user.save();

    return { message: 'Đổi mật khẩu thành công' };
  }
  // xác thực email

  //
}
