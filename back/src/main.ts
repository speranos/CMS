import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config({ path: process.cwd() + '/.env' }); 
  const app = await NestFactory.create(AppModule);
  console.log("PORT ===== ",process.env.SERVER_PORT)
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
