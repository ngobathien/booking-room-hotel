import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';
import { Room, RoomDocument } from 'src/rooms/schemas/room.schema';
import { RoomType } from 'src/room-types/schemas/room-type.schema';

@Injectable()
export class AiChatbotService {
  private ai: GoogleGenAI;

  constructor(
    private configService: ConfigService,
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
  ) {
    this.ai = new GoogleGenAI({
      apiKey: this.configService.get<string>('GEMINI_API_KEY'),
    });
  }

  async handleChat(message: string) {
    try {
      const rooms = await this.roomModel
        .find({ status: 'AVAILABLE' })
        .populate<{ roomType: RoomType }>('roomType');

      if (!rooms.length) {
        return 'Hiện chưa có phòng trống';
      }

      const roomContext = rooms
        .map(
          (r) =>
            `- Phòng ${r.roomNumber}: Giá ${r.roomType?.pricePerNight}đ, Sức chứa ${r.roomType?.capacity} người`,
        )
        .join('\n');

      const prompt = `
Bạn là chatbot của hệ thống khách sạn NBT.

Dữ liệu phòng:
${roomContext}

Quy tắc:
- Chỉ trả lời dựa trên dữ liệu trên
- Không được tự bịa
- Trả lời ngắn gọn, dễ hiểu
- KHÔNG dùng ký tự markdown như *, **, -, # 
- Chỉ trả lời bằng văn bản thuần (plain text)
- Mỗi phòng viết trên một dòng, không dùng bullet

Câu hỏi: ${message}
`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        // model: 'gemini 2.5 flash',
        contents: prompt,
      });

      return response.text;
    } catch (error) {
      console.error(error);
      return 'Lỗi hệ thống, thử lại sau';
    }
  }
}
