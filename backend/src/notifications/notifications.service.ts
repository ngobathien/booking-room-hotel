import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Notification,
  NotificationDocument,
} from './schemas/notification.schema';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  async create(payload: Partial<Notification>) {
    const doc = await this.notificationModel.create({ ...payload });
    return doc.toJSON();
  }

  // params: page, limit, recipientId
  async findAll(params?: Record<string, any>) {
    const page = parseInt(params?.page) || 1;
    const limit = parseInt(params?.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (params?.recipientId) filter.recipientId = params.recipientId;

    const [data, totalItems] = await Promise.all([
      this.notificationModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      this.notificationModel.countDocuments(filter),
    ]);

    return {
      message: 'Get notifications successfully',
      data,
      pagination: { page, limit, totalItems },
    };
  }

  async findOne(id: string) {
    return this.notificationModel.findById(id).lean();
  }

  async markAllRead(recipientId?: string) {
    const filter: any = { read: false };
    if (recipientId) filter.recipientId = recipientId;
    const res = await this.notificationModel.updateMany(filter, {
      read: true,
      readAt: new Date(),
    });
    return res;
  }

  async markRead(id: string) {
    const res = await this.notificationModel
      .findByIdAndUpdate(id, { read: true, readAt: new Date() }, { new: true })
      .lean();
    return res;
  }

  async remove(id: string) {
    return this.notificationModel.findByIdAndDelete(id).lean();
  }
}
