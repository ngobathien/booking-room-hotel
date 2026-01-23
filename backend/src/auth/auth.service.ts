import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from './dto/sign-in-auth.dto';
import { SignUpDto } from './dto/sign-up-auth.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // đăng nhập
  // signInDto: CreateAuthDto là để check dữ liệu từ client gửi lên có hợp lệ dữ liệu không
  async singIn(signInDto: SignInDto) {
    console.log('signInDto:', signInDto);

    // lấy email và password từ client gửi lên thông qua signInDto
    const { email, password } = signInDto;

    // kiểm tra email có tồn tại không, dùng email để tìm user
    const user = await this.usersService.findByEmail(email);
    console.log(user?.email);

    // nếu không có user hoặc mật khẩu không đúng thì báo lỗi
    if (!user) {
      throw new UnauthorizedException('Email không đúng hoặc không tồn tại');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mật khẩu không đúng');
    }
    // cho password vào hàm bcryp.hash để mã hóa
    // salt là chuỗi ngẫu nhiên được thêm vào trước khi mã hóa để tăng cường bảo mật

    const payload = {
      sub: user._id.toString(), // dùng để tìm dữ liệu khi decode payload dựa vào cái _id này
    };
    console.log(payload);

    const userResponse = { email: user.email, role: user.role };

    // nếu đúng thì trả về thông tin user
    // return {
    //   message: 'Đăng nhập thành công',
    //   access_token: await this.jwtService.signAsync(payload),
    //   user: userResponse,
    // };
    return {
      message: 'Đăng nhập thành công',
      access_token: await this.jwtService.signAsync(payload),
      token_type: 'Bearer',
      expires_in: '15m',
      user: {
        // id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone_number: user.phone_number || '',
        avatar: user.avatar || '',
        role: user.role,
        status: user.status,
      },
    };
  }

  // đăng ký
  async singUp(signUpDto: SignUpDto) {
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

  // đăng xuất
  // async signOut() {
  //   // logic đăng xuất (nếu cần thiết, ví dụ: thu hồi token)
  //   return { message: 'Đăng xuất thành công' };
  // }
  // quên mật khẩu

  // đổi mật khẩu

  // xác thực email

  // lấy thông tin user từ token

  // refresh token

  //
}
