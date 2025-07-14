import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:4200', 
    credentials: true, 
  });
  const config = new DocumentBuilder()
      .setTitle('API Cine')
      .setDescription('Documentación de la API del sistema de cine')
      .setVersion('1.0')
      .addCookieAuth('access_token') 
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
