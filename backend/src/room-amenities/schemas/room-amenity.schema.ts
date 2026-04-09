// room-amenities/schemas/room-amenity.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

// 👇 TYPE DOCUMENT CHUẨN
export type RoomAmenityDocument = HydratedDocument<RoomAmenity>;

@Schema({ timestamps: true })
export class RoomAmenity {
  @Prop({ type: Types.ObjectId, ref: 'Room', required: true })
  roomId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Amenity', required: true })
  amenityId: Types.ObjectId;
}

export const RoomAmenitySchema = SchemaFactory.createForClass(RoomAmenity);
