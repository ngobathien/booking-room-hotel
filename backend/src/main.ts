import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(process.env.PORT ?? 3000);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const port = 3000;
  await app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}
bootstrap();
