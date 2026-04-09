import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AmenityDocument = HydratedDocument<Amenity>;

@Schema({ timestamps: true })
export class Amenity {
  @Prop({ required: true, unique: true })
  name: string;
}

export const AmenitySchema = SchemaFactory.createForClass(Amenity);
