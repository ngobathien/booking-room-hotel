// bookings/schemas/booking.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BookingStatus } from '../enums/booking-status.enum';
import { BookingStayStatus } from '../enums/booking-stay-status.enum';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ unique: true })
  bookingCode: string;

  @Prop({ type: Types.ObjectId, ref: 'Room', required: true })
  room: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  // snapshot tại thời điểm đặt booking
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  phoneNumber: string;

  @Prop()
  specialRequest?: string;

  @Prop({ required: true })
  checkInDate: Date;

  @Prop({ required: true })
  checkOutDate: Date;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ enum: BookingStatus, default: BookingStatus.PENDING })
  bookingStatus: BookingStatus;

  @Prop({ enum: BookingStayStatus, default: BookingStayStatus.NOT_CHECKED_IN })
  stayStatus: BookingStayStatus;

  // @Prop({ type: String, unique: true, sparse: true, default: null })
  // idempotencyKey?: string;

  // timeline khi checkin, checkout theo time thực tế
  @Prop()
  confirmedAt?: Date;

  @Prop()
  checkedInAt?: Date;

  @Prop()
  checkedOutAt?: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
