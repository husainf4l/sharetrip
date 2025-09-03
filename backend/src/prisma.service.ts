import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  async onModuleInit(): Promise<void> {
    try {
      if ((this as any).$connect) await (this as any).$connect();
    } catch (error) {
      console.warn('Database connection failed. Running without database.');
      // Don't throw error to allow app to start without database
    }
  }

  async onModuleDestroy(): Promise<void> {
    if ((this as any).$disconnect) await (this as any).$disconnect();
  }
}
