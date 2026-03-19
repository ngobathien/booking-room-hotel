import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class CreateHotelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPhoneNumber('VN')
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  policy: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  images: string[];
}
