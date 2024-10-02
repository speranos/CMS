import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService){}
  async getHello(): Promise<string> {
    await this.prisma.user.create({
      data: {
        userName: "Amine",
        pass: "Pass",
      },
    })
    return 'Hello World!';
  }
}
