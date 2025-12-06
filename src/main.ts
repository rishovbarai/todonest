import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Set global prefix for all routes
  app.setGlobalPrefix('api');
  
  // Enable CORS for frontend
  let allowedOrigins: string[] = [];
  
  if (process.env.NODE_ENV === 'production') {
    // In production, use ALLOWED_ORIGINS env var or default to empty array
    allowedOrigins = process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
      : [];
  } else {
    // In development, allow all origins
    allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
  }
  
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' 
      ? (allowedOrigins.length > 0 ? allowedOrigins : true)
      : true,
    credentials: true,
  });
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://0.0.0.0:${port}`);
  console.log(`API endpoints available at: http://0.0.0.0:${port}/api`);
}
bootstrap();


