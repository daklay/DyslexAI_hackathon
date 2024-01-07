/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://p8ygx8-3000.csb.app',
    credentials: true,
 });
  await app.listen(3000,'0.0.0.0');
}
bootstrap();
