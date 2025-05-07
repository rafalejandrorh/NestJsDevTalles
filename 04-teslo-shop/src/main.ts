import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

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

  const config = new DocumentBuilder()
    .setTitle('Teslo Shop')
    .setDescription('Teslo Shop API description')
    .setVersion('1.0')
    .addTag('teslo')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
