import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    console.log('Starting NestJS application...');
    const app = await NestFactory.create(AppModule);
    console.log('App created successfully');

    // Enable global validation
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    console.log('Validation pipe enabled');

    // Enable CORS for development
    app.enableCors({
      origin: process.env.NODE_ENV === 'development' ? true : process.env.FRONTEND_URL,
      credentials: true,
    });
    console.log('CORS enabled');

    // Set global prefix for all routes
    app.setGlobalPrefix('api');
    console.log('Global prefix set to /api');

    console.log('Attempting to listen on port 3004...');
    await app.listen(process.env.PORT ?? 3003, 'localhost');
    console.log(' Server is now listening on port 3003!');
    console.log(' Server URL: http://localhost:3003');
    console.log(' Available endpoints:');
    console.log('  - GET  /api');
    console.log('  - POST /api/auth/login');
    console.log('  - GET  /api/tours/my-tours');
    console.log('  - POST /api/bookings');
    console.log('  - And many more...');
  } catch (error) {
    console.error(' Error starting server:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

bootstrap();
