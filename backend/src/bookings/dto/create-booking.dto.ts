import {
  IsDateString,
  IsEmail,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookingDto {
  @IsMongoId()
  room: string;

  @IsDateString()
  checkInDate: string;

  @IsDateString()
  checkOutDate: string;

  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  specialRequest?: string;

  // @IsOptional()
  // @IsString()
  // idempotencyKey?: string;
}
