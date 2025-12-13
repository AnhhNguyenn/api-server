import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security: Helmet
  app.use(helmet());

  // CORS
  app.enableCors({
    origin: '*', // Lưu ý: Nên thay bằng domain frontend thực tế khi lên production để bảo mật hơn
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('Headless CMS API')
    .setDescription('API for managing website content')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // --- SỬA QUAN TRỌNG Ở ĐÂY ---
  // Vercel cung cấp port qua process.env.PORT. 
  // Nếu không có (chạy local), nó mới dùng 3000.
  await app.listen(process.env.PORT || 3000); 
}
bootstrap();
