import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './helpers/http-exception';
import { TimezoneInterceptor } from './helpers/timezone';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useConfig } from './utils/useConfig';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const { isDev } = useConfig();
  const config = new DocumentBuilder()
    .setTitle('Service ERP - API Documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'jwt-token',
    )
    .build();
  const documentApi = () => SwaggerModule.createDocument(app, config);
  if (isDev) {
    SwaggerModule.setup('api-documentation', app, documentApi, {
      customSiteTitle: 'ERP Documentation',
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TimezoneInterceptor());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });
  await app.listen(process.env.PORT);
}
bootstrap();
