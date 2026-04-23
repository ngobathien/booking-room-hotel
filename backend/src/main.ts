import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const api_url = process.env.API_URL;
  // console.log('API URL:', process.env.GEMINI_API_KEY);

  const configService = app.get(ConfigService);

  console.log('API KEY:', configService.get('GEMINI_API_KEY'));

  app.use(cookieParser());
  app.setGlobalPrefix(api_url || '/api/v1');

  app.useGlobalPipes(new ValidationPipe());
  // app.enableCors();
  app.enableCors({
    // origin: 'http://localhost:5173',

    origin: 'https://booking-room-hotel-murex.vercel.app',
    credentials: true,
  });
  // await app.listen(port, () => {
  //   console.log(`Example app listening at http://localhost:${port}${api_url}/`);
  // });
  await app.listen(port);

  console.log(`Server running on port ${port}`);
}
bootstrap();
