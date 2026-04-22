import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
// backend/src/users/schemas/user.schema.ts
export type UserDocument = HydratedDocument<User>;

// role
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

// status
export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
}

export enum AuthProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  // @Prop({ required: false, unique: true })
  @Prop()
  phoneNumber: string;

  @Prop({
    required: false,
  })
  password?: string;

  @Prop()
  avatar: string;

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.USER,
    required: true,
  })
  role: UserRole;

  @Prop({
    type: String,
    enum: UserStatus,
    default: UserStatus.ACTIVE,
    required: true,
  })
  status: UserStatus;

  @Prop()
  refreshToken: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({
    type: String,
    enum: AuthProvider,
    default: AuthProvider.LOCAL,
  })
  provider: AuthProvider;
}

export const UserSchema = SchemaFactory.createForClass(User);
