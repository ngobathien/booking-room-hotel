import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: false })
  recipientId?: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  body?: string;

  @Prop()
  type?: string; // e.g., paid, unpaid, booking

  @Prop({ type: Object })
  data?: any;

  @Prop({ default: false })
  read?: boolean;

  @Prop()
  readAt?: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
NotificationSchema.index({ recipientId: 1, read: 1, createdAt: -1 });
