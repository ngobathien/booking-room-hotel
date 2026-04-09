import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OtpDocument = Otp & Document;

@Schema({ timestamps: true })
export class Otp {
  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  userId?: Types.ObjectId;

  @Prop()
  email: string;

  @Prop()
  fullName: string;

  @Prop({ required: true })
  otp: string; // nên hash

  @Prop({ default: false })
  isUsed: boolean;

  // OTP hết hạn tự xóa
  @Prop({ expires: 300 }) // 300 = 300 giây = 5 phút
  expiresAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
