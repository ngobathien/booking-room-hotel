import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  // constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // chèn model User vào service
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // thêm user mới
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);

    return createdUser;
  }

  // lấy tất cả danh sách user
  getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // lấy thông tin user theo email
  async findByEmail(email: string): Promise<User | null> {
    console.log(this.userModel);
    return this.userModel.findOne({ email: email }).exec();
  }

  // lấy thông tin user theo id
  async findById(id: string): Promise<User | null> {
    console.log(this.userModel);
    return this.userModel.findById({ _id: id }).exec();
  }

  // findAll() {
  //   return `This action returns all users`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
