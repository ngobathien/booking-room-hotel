import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { VnpayService } from './gateways/vnpay/vnpay.service';
import { PaymentsService } from './payments.service';
import { AdminQueryPaymentDto } from './dto/admin-query-payment.dto';
import { PaymentStatus } from './enums/payment-status.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/schemas/user.schema';
import { RevenueByMethodDto } from './dto/revenue-by-method.dto';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private vnpayService: VnpayService,
  ) {}

  // ========== Admin APIs ==========
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin/total-revenue')
  getTotalRevenue() {
    return this.paymentsService.getTotalRevenue();
  }

  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin/revenue-by-method')
  getRevenueByMethod(): Promise<RevenueByMethodDto[]> {
    return this.paymentsService.getRevenueByMethod();
  }

  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin') // dynamic query + pagination
  adminFindAll(@Query() query: AdminQueryPaymentDto) {
    return this.paymentsService.adminFindAll(query);
  }

  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin/:id') // phải để cuối cùng
  adminFindOne(@Param('id') id: string) {
    return this.paymentsService.adminFindOne(id);
  }

  @Post('create')
  createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
    @Req() req: Request,
  ) {
    const ip =
      (req.headers['x-forwarded-for'] as string) ||
      req.socket.remoteAddress ||
      '127.0.0.1';

    return this.paymentsService.createPayment(createPaymentDto, ip);
  }

  @Get('vnpay-ipn')
  vnpayIpn(@Query() query: Record<string, string>) {
    return this.vnpayService.vnpayIpn(query);
  }

  @Get('vnpay-return')
  vnpayReturn(@Query() query: Record<string, string>, @Res() res: Response) {
    return this.vnpayService.vnpayReturn(query, res);
  }
}
