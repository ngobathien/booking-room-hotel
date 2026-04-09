import { IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  zalo?: string;

  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
