import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactDocument = HydratedDocument<Contact>;

@Schema({ timestamps: true })
export class Contact {
  @Prop({ required: true })
  phone: string;

  @Prop()
  zalo: string;

  @Prop()
  facebook: string;

  @Prop()
  address: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
