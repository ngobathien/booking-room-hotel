import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { RoomType } from './room-type.schema';
import { RoomStatus } from '../enums/room-status.enum';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true, trim: true })
  roomNumber: string;

  // hotel_id  ref sang Hotel schema
  @Prop({ type: Types.ObjectId, required: true })
  hotelId: Types.ObjectId;

  // room_type_id  ref sang RoomType schema
  @Prop({
    type: Types.ObjectId,
    // ref: RoomType.name,
    ref: 'RoomType',
    required: true,
  })
  roomType: RoomType;

  @Prop({
    type: String,
    enum: RoomStatus,
    default: RoomStatus.AVAILABLE,
  })
  status: RoomStatus;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
