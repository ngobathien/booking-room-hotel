import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { BookingItemsModule } from './booking-items/booking-items.module';
import { BookingSchedulerModule } from './booking-scheduler/booking-scheduler.module';
import { HotelsModule } from './hotels/hotels.module';
import { PaymentsModule } from './payments/payments.module';
import { RoomTypesModule } from './room-types/room-types.module';
import { RoomsModule } from './rooms/rooms.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    // env
    ConfigModule.forRoot({ isGlobal: true, load: [] }),

    // kết nối database mongodb
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),

        onConnectionCreate: (connection: Connection) => {
          connection.on('connected', () => {
            console.log('Kết nối database thành công');
          });

          // log xem MONGODB_URI từ .env
          console.log(configService.get<string>('MONGODB_URI'));
          return connection;
        },
      }),
    }),
    //
    UsersModule,
    AuthModule,
    RoomsModule,
    RoomTypesModule,
    PaymentsModule,
    BookingItemsModule,
    HotelsModule,
    BookingSchedulerModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
