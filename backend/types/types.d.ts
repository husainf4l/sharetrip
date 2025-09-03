declare module '@nestjs/common' {
  export const Injectable: any;
  export const Module: any;
  export const Controller: any;
  export const Get: any;
  export const Post: any;
  export const Body: any;
  export const Query: any;
  export const Param: any;
  export const OnModuleInit: any;
  export const OnModuleDestroy: any;
  export const ValidationPipe: any;
  export const BadRequestException: any;
  export const UnauthorizedException: any;
  export const UseGuards: any;
  export const Req: any;
  export type NestModule = any;
}

declare module '@nestjs/core' {
  export const NestFactory: any;
}

declare module '@nestjs/swagger' {
  export const DocumentBuilder: any;
  export const SwaggerModule: any;
}

declare module 'dotenv' {
  const dotenv: any;
  export = dotenv;
}

declare module 'argon2' {
  export function hash(input: string, options?: any): Promise<string>;
  export function verify(hash: string, input: string): Promise<boolean>;
  export const argon2id: any;
}

declare module '@prisma/client' {
  export class PrismaClient {
    constructor();
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
    [key: string]: any;
  }
  export type Prisma = any;
}

declare module 'socket.io' {
  const x: any;
  export = x;
}
