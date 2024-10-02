import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  const myEnv = dotenv.config({ path: process.cwd() + '/.env' });
  const app = await NestFactory.create(AppModule);
  console.log("PORT ======= ",process.env.SERVER_PORT);
  console.log(process.env.DATABASE_URL+process.env.DATABASE_NAME);

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
