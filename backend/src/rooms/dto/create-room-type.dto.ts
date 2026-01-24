import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateRoomTypeDto {
  @IsString()
  @IsNotEmpty()
  typeName: string;

  @IsInt()
  @Min(1)
  capacity: number;

  @IsNumber()
  @Min(0)
  basePrice: number;
}
