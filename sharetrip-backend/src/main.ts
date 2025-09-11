import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Enable CORS for development
  app.enableCors({
    origin: process.env.NODE_ENV === 'development' ? true : process.env.FRONTEND_URL,
    credentials: true,
  });

  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
