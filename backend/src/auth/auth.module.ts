import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './schemas/refresh-token.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { ResetToken, ResetTokenSchema } from './schemas/reset-token.schema';
import { MailService } from '../services/mail.service';
import { Otp, OtpSchema } from './schemas/email-otp.schema';
import { GoogleStrategy } from './strategies/google.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  // import UsersModule để sử dụng UsersService trong AuthService
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: RefreshToken.name, schema: RefreshTokenSchema },
      { name: User.name, schema: UserSchema },
      { name: ResetToken.name, schema: ResetTokenSchema },
      { name: Otp.name, schema: OtpSchema },
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,

      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET')!,
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN') as any,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MailService, GoogleStrategy],
})
export class AuthModule {}
