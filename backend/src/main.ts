import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    dotenv.config();
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    if (process.env.NODE_ENV !== 'production') {
      const config = new DocumentBuilder()
        .setTitle('ShareTrip API')
        .setDescription('ShareTrip backend API')
        .setVersion('0.1')
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('docs', app, document);
    }

    const port = Number(process.env.PORT) || 3333;
    await app.listen(port);
    console.log(`Server running on http://localhost:${port}`);
  } catch (err) {
    // fail fast
    // eslint-disable-next-line no-console
    console.error('Failed to bootstrap application', err);
    process.exit(1);
  }
}

bootstrap();
