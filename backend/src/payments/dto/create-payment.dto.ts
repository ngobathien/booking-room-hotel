import { IsEnum, IsMongoId } from 'class-validator';
import { PaymentMethod } from '../enums/payment-method.enum';

export class CreatePaymentDto {
  @IsMongoId()
  bookingId: string;

  @IsEnum(PaymentMethod)
  method: PaymentMethod;
}
