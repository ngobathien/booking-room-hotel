import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber('VN')
  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
