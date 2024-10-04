import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';


async function bootstrap() {
  const myEnv = dotenv.config({ path: process.cwd() + '/.env' });
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST',
    credentials: true,
  });

  await app.listen(4000);
}
bootstrap();
