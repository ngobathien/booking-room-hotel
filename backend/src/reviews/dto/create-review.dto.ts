import {
  IsMongoId,
  IsNumber,
  Min,
  Max,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReviewDto {
  @IsMongoId()
  roomId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
