// bookings/schemas/booking.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BookingStayStatus } from 'src/bookings/enums/booking-stay-status.enum';

export type BookingItemDocument = BookingItem & Document;

@Schema({ timestamps: true })
export class BookingItem {
  @Prop({ type: Types.ObjectId, ref: 'Booking', required: true })
  booking: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Room', required: true })
  room: Types.ObjectId;

  @Prop({ required: true })
  price: number;

  @Prop({
    enum: BookingStayStatus,
    default: BookingStayStatus.NOT_CHECKED_IN,
  })
  stayStatus: BookingStayStatus;

  @Prop()
  checkedInAt?: Date;

  @Prop()
  checkedOutAt?: Date;
}

export const BookingItemSchema = SchemaFactory.createForClass(BookingItem);
