import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AiChatbotService } from './ai_chatbot.service';

@Controller('ai-chatbot')
export class AiChatbotController {
  constructor(private readonly aiChatbotService: AiChatbotService) {}

  @UseGuards(AuthGuard)
  @Post('chat')
  async chatbot(
    // @NestRequest() req: AuthenticatedRequest,
    @Body('message') message: string,
    @Req() req: Request & { user: { userId: string } },
  ) {
    console.log('📩 MESSAGE:', message);
    console.log('👤 USER FROM REQUEST:', req.user);
    // const user = req.user;
    return this.aiChatbotService.handleChat(message, req.user.userId);
    // return this.aiChatbotService.handleChat(message, req.user.userId);
  }
}
