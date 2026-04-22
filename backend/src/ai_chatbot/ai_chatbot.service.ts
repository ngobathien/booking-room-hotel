import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

import { Room, RoomDocument } from 'src/rooms/schemas/room.schema';
import { RoomType } from 'src/room-types/schemas/room-type.schema';

import { Booking, BookingDocument } from 'src/bookings/schemas/booking.schema';

@Injectable()
export class AiChatbotService {
  private ai: GoogleGenAI;

  constructor(
    private configService: ConfigService,

    @InjectModel(Room.name)
    private roomModel: Model<RoomDocument>,

    @InjectModel(Booking.name)
    private bookingModel: Model<BookingDocument>,
  ) {
    this.ai = new GoogleGenAI({
      apiKey: this.configService.get<string>('GEMINI_API_KEY'),
    });
  }

  async handleChat(message: string, userId: string) {
    try {
      // =========================
      // ROOMS
      // =========================
      const allRooms = await this.roomModel
        .find()
        .populate<{ roomType: RoomType }>('roomType');

      const availableRooms = allRooms.filter((r) => r.status === 'AVAILABLE');

      const unavailableRooms = allRooms.filter((r) => r.status !== 'AVAILABLE');

      const summary = `Tổng số phòng: ${allRooms.length}. Phòng trống: ${availableRooms.length}. Phòng khác: ${unavailableRooms.length}.`;

      const availableContext = availableRooms.length
        ? availableRooms
            .map((r) => {
              const rt = r.roomType as RoomType;

              return [
                `Phòng ${r.roomNumber}`,
                `Loại: ${rt?.typeName ?? 'Chưa rõ'}`,
                `Giá: ${rt?.pricePerNight?.toLocaleString('vi-VN') ?? '?'}đ/đêm`,
                `Sức chứa: ${rt?.capacity ?? '?'} người`,
                `Mô tả: ${r.description || 'Không có'}`,
              ].join(', ');
            })
            .join('\n')
        : 'Không có phòng trống.';

      const prices = availableRooms
        .map((r) => (r.roomType as RoomType)?.pricePerNight)
        .filter((p) => typeof p === 'number') as number[];

      const minPrice = prices.length ? Math.min(...prices) : 0;
      const maxPrice = prices.length ? Math.max(...prices) : 0;
      const avgPrice = prices.length
        ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
        : 0;

      const priceStats = `Min: ${minPrice.toLocaleString('vi-VN')}đ, Max: ${maxPrice.toLocaleString('vi-VN')}đ, Avg: ${avgPrice.toLocaleString('vi-VN')}đ`;

      const groupedByType: Record<string, string[]> = {};

      for (const r of availableRooms) {
        const typeName = (r.roomType as RoomType)?.typeName ?? 'Khác';

        if (!groupedByType[typeName]) groupedByType[typeName] = [];
        groupedByType[typeName].push(r.roomNumber);
      }

      const groupedContext = Object.entries(groupedByType)
        .map(
          ([type, rooms]) =>
            `Loại ${type}: ${rooms.length} phòng (${rooms.join(', ')})`,
        )
        .join('\n');

      // =========================
      // BOOKINGS (USER)
      // =========================
      const myBookings = await this.bookingModel
        .find({ user: userId })
        .populate({
          path: 'room',
          populate: {
            path: 'roomType',
          },
        })
        .sort({ createdAt: -1 })
        .limit(5);

      const bookingContext = myBookings.length
        ? myBookings
            .map((b) => {
              const room = b.room as any;
              const rt = room?.roomType;

              return [
                `Mã: ${b.bookingCode}`,
                `Phòng: ${room?.roomNumber}`,
                `Loại: ${rt?.typeName}`,
                `Tổng tiền: ${b.totalPrice?.toLocaleString('vi-VN')}đ`,
                `Trạng thái booking: ${b.bookingStatus}`,
                `Trạng thái ở: ${b.stayStatus}`,
                `Check-in: ${b.checkInDate}`,
                `Check-out: ${b.checkOutDate}`,
              ].join(', ');
            })
            .join('\n')
        : 'Khách chưa có booking nào.';

      // =========================
      // PROMPT
      // =========================
      const today = new Date().toLocaleDateString('vi-VN');

      const prompt = `
Bạn là trợ lý tư vấn khách sạn NBT. Hôm nay: ${today}.

=== THÔNG TIN PHÒNG ===
${summary}

=== GIÁ PHÒNG ===
${priceStats}

=== PHÒNG THEO LOẠI ===
${groupedContext || 'Không có'}

=== DANH SÁCH PHÒNG TRỐNG ===
${availableContext}

=== BOOKING CỦA USER ===
${bookingContext}

=== RULE ===
- Nếu hỏi phòng → dùng ROOM DATA
- Nếu hỏi booking → dùng BOOKING DATA
- Không được bịa dữ liệu
- Nếu không có booking → nói rõ chưa có
- Trả lời ngắn gọn, dễ hiểu, tiếng Việt

Câu hỏi: ${message}
`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text;
    } catch (error) {
      console.error('[AiChatbotService] Error:', error);

      if (error?.status === 429) {
        return 'Hệ thống đang quá tải, vui lòng thử lại sau ít phút.';
      }

      return 'Lỗi hệ thống, vui lòng thử lại sau.';
    }
  }
}
