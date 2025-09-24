import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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

    // Get CORS origins from environment
    const frontendOrigins = process.env.FRONTEND_ORIGINS
      ? process.env.FRONTEND_ORIGINS.split(',').map(origin => origin.trim())
      : [process.env.FRONTEND_URL || 'http://localhost:3000'];

    // Enable CORS
    app.enableCors({
      origin: process.env.NODE_ENV === 'development' ? true : frontendOrigins,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    });
    console.log('CORS enabled for origins:', frontendOrigins);

    // Set global prefix for all routes
    app.setGlobalPrefix('api');
    console.log('Global prefix set to /api');

    // Swagger configuration
    if (process.env.NODE_ENV !== 'production') {
      const config = new DocumentBuilder()
        .setTitle('ShareTrip API')
        .setDescription('ShareTrip Backend API for tours, bookings, and media management')
        .setVersion('1.0')
        .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
          },
          'JWT-auth',
        )
        .addServer('http://localhost:3333', 'Development server')
        .addTag('auth', 'Authentication endpoints')
        .addTag('tours', 'Tour management')
        .addTag('bookings', 'Booking management')
        .addTag('upload', 'Media upload endpoints')
        .addTag('media', 'Media management')
        .addTag('health', 'Health check endpoints')
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api/docs', app, document, {
        customSiteTitle: 'ShareTrip API Documentation',
        customfavIcon: '/favicon.ico',
        customJs: [
          'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
        ],
        customCssUrl: [
          'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        ],
      });
      console.log('Swagger documentation available at /api/docs');
    }

    const port = process.env.PORT ?? 3003;
    console.log(`Attempting to listen on port ${port}...`);
    
    // Add error handling for the listen operation
    try {
      await app.listen(port, '0.0.0.0');
      console.log(`✅ Server is now listening on port ${port}!`);
      console.log(` Server URL: http://localhost:${port}`);
      console.log(' Available endpoints:');
      console.log('  - GET  /api');
      console.log('  - POST /api/auth/login');
      console.log('  - POST /api/auth/register');
      console.log('  - GET  /api/tours');
      console.log('  - POST /api/upload/presign');
      console.log('  - POST /api/media');
      console.log('  - GET  /api/tours/:id/media');
      console.log('  - GET  /healthz');
      console.log('  - GET  /readyz');
      console.log('  - GET  /info');
      if (process.env.NODE_ENV !== 'production') {
        console.log('  - GET  /api/docs (Swagger)');
      }
      console.log('  - And many more...');
      
      // Keep the process alive
      console.log('Server started successfully. Press Ctrl+C to stop.');
      
      // Ensure the process doesn't exit by keeping the event loop alive
      process.stdin.resume();
      
      // Add a more robust keep-alive mechanism
      let keepAliveCounter = 0;
      const keepAliveInterval = setInterval(() => {
        keepAliveCounter++;
        console.log(`🔄 Server keep-alive heartbeat #${keepAliveCounter} at ${new Date().toISOString()}`);
        
        // Force garbage collection if available (in development)
        if (global.gc && process.env.NODE_ENV === 'development') {
          global.gc();
        }
      }, 30000); // Every 30 seconds
      
      // Handle graceful shutdown
      process.on('SIGINT', () => {
        console.log('Received SIGINT, shutting down gracefully...');
        clearInterval(keepAliveInterval);
        process.exit(0);
      });
      
      process.on('SIGTERM', () => {
        console.log('Received SIGTERM, shutting down gracefully...');
        clearInterval(keepAliveInterval);
        process.exit(0);
      });
      
      // Keep the event loop active with a promise that never resolves
      // This ensures the process stays alive
      new Promise(() => {
        // This promise never resolves, keeping the event loop active
      });
    } catch (listenError) {
      console.error('❌ Error during server listen:', listenError);
      console.error('Listen error stack:', listenError.stack);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error starting server:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

bootstrap();