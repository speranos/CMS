import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    console.log("DATBASE URL +++++++ ", process.env.DATABASE_URL);
    return 'Hello World!';
  }
}
