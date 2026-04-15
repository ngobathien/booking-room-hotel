import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() payload: any) {
    const doc = await this.notificationsService.create(payload);
    return { message: 'Notification created', data: doc };
  }

  @Get()
  async findAll(@Query() query: Record<string, any>) {
    return this.notificationsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.notificationsService.findOne(id);
    return { message: 'Get notification', data };
  }

  @Patch(':id/read')
  async markRead(@Param('id') id: string) {
    const data = await this.notificationsService.markRead(id);
    return { message: 'Marked read', data };
  }

  @Patch('mark-all-read')
  async markAllRead(@Body() body: any) {
    const recipientId = body?.recipientId;
    const res = await this.notificationsService.markAllRead(recipientId);
    return { message: 'All marked read', result: res };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.notificationsService.remove(id);
    return { message: 'Deleted', data };
  }
}
