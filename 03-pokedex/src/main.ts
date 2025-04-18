import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Add the ValidationPipe to the global scope
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // This is used to transform the incoming request body to the DTO type,
      transformOptions: {
        enableImplicitConversion: true, // This is used to transform the incoming request body to the DTO type,
      }
    })
  );

  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
