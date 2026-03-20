import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PaymentMethod } from '../enums/payment-method.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({
    type: Types.ObjectId,
    ref: 'Booking',
    required: true,
  })
  booking: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({
    enum: PaymentMethod,
    default: PaymentMethod.VNPAY,
  })
  method: string;

  @Prop({
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Prop()
  paymentUrl: string;

  @Prop()
  transactionId: string;

  // thời điểm mà payment sẽ hết hạn
  @Prop({ required: true })
  expiryAt: Date;

  createdAt: Date;
  updatedAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
