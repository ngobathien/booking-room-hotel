import { Body, Controller, Post } from '@nestjs/common';
import { AiChatbotService } from './ai_chatbot.service';

@Controller('ai-chatbot')
export class AiChatbotController {
  constructor(private readonly aiChatbotService: AiChatbotService) {}

  @Post('chat')
  async chatbot(@Body('message') message: string) {
    return this.aiChatbotService.handleChat(message);
  }
}
