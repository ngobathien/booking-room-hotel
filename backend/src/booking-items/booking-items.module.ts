import { Module } from '@nestjs/common';
import { BookingItemsService } from './booking-items.service';
import { BookingItemsController } from './booking-items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingItem, BookingItemSchema } from './schemas/booking-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookingItem.name, schema: BookingItemSchema },
    ]),
  ],
  controllers: [BookingItemsController],
  providers: [BookingItemsService],
})
export class BookingItemsModule {}
