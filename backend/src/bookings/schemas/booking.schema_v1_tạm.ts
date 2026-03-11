// bookings/schemas/booking.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BookingDocument = Booking & Document;

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum PaymentMethod {
  COD = 'cod',
  VNPAY = 'vnpay',
  MOMO = 'momo',
}

export enum PaymentStatus {
  UNPAID = 'unpaid',
  PAID = 'paid',
  FAILED = 'failed',
}

@Schema({ timestamps: true })
export class Booking {
  // ==============================
  // Reference
  // ==============================

  @Prop({ type: Types.ObjectId, ref: 'Room', required: true, index: true })
  room: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user?: Types.ObjectId;

  // ==============================
  // Snapshot phòng
  // ==============================

  @Prop({ required: true })
  roomName: string;

  @Prop({ required: true })
  roomNumber: string;

  @Prop({ required: true })
  pricePerNight: number;

  // ==============================
  // Thời gian
  // ==============================

  @Prop({ required: true })
  checkInDate: Date;

  @Prop({ required: true })
  checkOutDate: Date;

  @Prop({ required: true })
  nights: number;

  // ==============================
  // Thông tin khách
  // ==============================

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  guests: number;

  @Prop()
  note?: string;

  // ==============================
  // Pricing
  // ==============================

  @Prop({ required: true })
  subtotal: number;

  @Prop({ default: 0 })
  tax: number;

  @Prop({ default: 0 })
  discount: number;

  @Prop({ required: true })
  totalPrice: number;

  // ==============================
  // Payment
  // ==============================

  // ==============================
  // Booking status
  // ==============================

  @Prop({
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
