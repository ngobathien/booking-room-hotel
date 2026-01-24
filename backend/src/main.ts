import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const api_url = process.env.API_URL;

  app.setGlobalPrefix(api_url || '/api/v1');

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}${api_url}/`);

    // console.log(process.env.PORT);
  });
}
bootstrap();
