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
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { VnpayService } from './gateways/vnpay/vnpay.service';
import { PaymentsService } from './payments.service';
import { AdminQueryPaymentDto } from './dto/admin-query-payment.dto';
import { PaymentStatus } from './enums/payment-status.enum';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private vnpayService: VnpayService,
  ) {}

  // ========== Admin APIs ==========
  @Get('admin')
  adminFindAll(@Query() query: AdminQueryPaymentDto) {
    return this.paymentsService.adminFindAll(query);
  }

  @Get('admin/:id')
  adminFindOne(@Param('id') id: string) {
    return this.paymentsService.adminFindOne(id);
  }

  @Patch('admin/:id/status')
  adminUpdateStatus(
    @Param('id') id: string,
    @Body('status') status: PaymentStatus,
  ) {
    return this.paymentsService.adminUpdateStatus(id, status);
  }

  // Tổng doanh thu
  @Get('admin/total-revenue')
  getTotalRevenue() {
    return this.paymentsService.getTotalRevenue();
  }

  // Tổng doanh thu theo phương thức
  @Get('admin/revenue-by-method')
  getRevenueByMethod() {
    return this.paymentsService.getRevenueByMethod();
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
