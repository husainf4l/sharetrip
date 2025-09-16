import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../common/s3/s3.service';

interface HealthCheck {
  status: 'ok' | 'error';
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
  services: {
    database: 'ok' | 'error';
    storage: 'ok' | 'error';
  };
}

interface ReadinessCheck {
  status: 'ready' | 'not_ready';
  timestamp: string;
  checks: {
    database: boolean;
    storage: boolean;
    config: boolean;
  };
}

@Controller()
export class HealthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  @Get('healthz')
  @HttpCode(HttpStatus.OK)
  async healthCheck(): Promise<HealthCheck> {
    const timestamp = new Date().toISOString();
    const uptime = process.uptime();
    const environment = this.configService.get<string>('NODE_ENV', 'development');
    const version = process.env.npm_package_version || '1.0.0';

    let dbStatus: 'ok' | 'error' = 'ok';
    let storageStatus: 'ok' | 'error' = 'ok';

    // Check database connection
    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch (error) {
      dbStatus = 'error';
      console.error('Database health check failed:', error);
    }

    // Check storage (S3 or local)
    try {
      const storageType = this.configService.get<string>('MEDIA_STORAGE', 's3');
      if (storageType === 's3') {
        // Simple S3 check - try to generate a presigned URL
        await this.s3Service.getSignedUrl('health-check', 10);
      }
      // For local storage, we assume it's always available
    } catch (error) {
      storageStatus = 'error';
      console.error('Storage health check failed:', error);
    }

    const overallStatus = dbStatus === 'ok' && storageStatus === 'ok' ? 'ok' : 'error';

    return {
      status: overallStatus,
      timestamp,
      uptime,
      environment,
      version,
      services: {
        database: dbStatus,
        storage: storageStatus,
      },
    };
  }

  @Get('readyz')
  @HttpCode(HttpStatus.OK)
  async readinessCheck(): Promise<ReadinessCheck> {
    const timestamp = new Date().toISOString();

    let dbReady = false;
    let storageReady = false;
    let configReady = false;

    // Check database readiness
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      dbReady = true;
    } catch (error) {
      console.error('Database readiness check failed:', error);
    }

    // Check storage readiness
    try {
      const storageType = this.configService.get<string>('MEDIA_STORAGE', 's3');
      if (storageType === 's3') {
        // Check if S3 credentials are configured
        const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
        const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
        const bucketName = this.configService.get<string>('AWS_BUCKET_NAME');

        storageReady = !!(accessKeyId && secretAccessKey && bucketName);
      } else {
        storageReady = true; // Local storage is always ready
      }
    } catch (error) {
      console.error('Storage readiness check failed:', error);
    }

    // Check configuration readiness
    try {
      const requiredConfigs = [
        'DATABASE_URL',
        'JWT_SECRET',
        'JWT_REFRESH_SECRET',
      ];

      configReady = requiredConfigs.every(config =>
        !!this.configService.get<string>(config)
      );
    } catch (error) {
      console.error('Config readiness check failed:', error);
    }

    const isReady = dbReady && storageReady && configReady;

    return {
      status: isReady ? 'ready' : 'not_ready',
      timestamp,
      checks: {
        database: dbReady,
        storage: storageReady,
        config: configReady,
      },
    };
  }

  @Get('info')
  @HttpCode(HttpStatus.OK)
  getInfo() {
    return {
      name: 'ShareTrip Backend API',
      version: process.env.npm_package_version || '1.0.0',
      environment: this.configService.get<string>('NODE_ENV', 'development'),
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      storageType: this.configService.get<string>('MEDIA_STORAGE', 's3'),
      features: {
        authentication: true,
        mediaUpload: true,
        tours: true,
        bookings: true,
        cart: true,
        wishlist: true,
      },
    };
  }
}