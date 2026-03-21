// hotel.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HotelDocument = Hotel & Document;

@Schema({ timestamps: true })
export class Hotel {
  @Prop({ required: true })
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop()
  description: string;

  @Prop()
  policy: string;

  @Prop({ type: [String], default: [] })
  images: string[];
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
