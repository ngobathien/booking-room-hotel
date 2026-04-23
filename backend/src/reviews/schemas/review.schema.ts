import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Room',
    required: true,
  })
  roomId: Types.ObjectId;

  @Prop({
    min: 1,
    max: 5,
    required: true,
  })
  rating: number;

  @Prop({
    trim: true,
    maxlength: 1000,
  })
  comment: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
