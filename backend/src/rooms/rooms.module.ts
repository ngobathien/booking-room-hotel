import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { ConfigModule } from '@nestjs/config';
import { Room, RoomSchema } from './schemas/room.schema';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { RoomTypesModule } from 'src/room-types/room-types.module';
import { RoomType } from 'src/room-types/entities/room-type.entity';
import { RoomTypeSchema } from 'src/room-types/schemas/room-type.schema';

@Module({
  imports: [
    RoomTypesModule,
    UsersModule,
    ConfigModule,

    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: RoomType.name, schema: RoomTypeSchema },
    ]),

    // để hờ xem có cần đến ko
    // JwtModule.register({
    //   global: true,
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '1d' },
    // }),
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
