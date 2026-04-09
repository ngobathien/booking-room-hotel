import { Module } from '@nestjs/common';
import { AiChatbotService } from './ai_chatbot.service';
import { AiChatbotController } from './ai_chatbot.controller';
import { Room, RoomSchema } from 'src/rooms/schemas/room.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  controllers: [AiChatbotController],
  providers: [AiChatbotService],
})
export class AiChatbotModule {}
