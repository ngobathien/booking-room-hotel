import { IsDateString, IsEmail, IsMongoId, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsMongoId({ each: true })
  rooms: string[];

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
}
