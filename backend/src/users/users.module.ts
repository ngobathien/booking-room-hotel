import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { SupabaseService } from 'src/config/supabase.config';

@Module({
  // import UserSchema từ user.schema.ts
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, SupabaseService],

  // exports để cho các module khác dùng
  exports: [UsersService, SupabaseService],
})
export class UsersModule {}
