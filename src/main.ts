import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const stripe = require('stripe')(configService.get('STRIPE_ACCESS_KEY'));

  const jwtSecret = configService.get('JWT_SECRET');
  await app.listen(3000);

}
bootstrap();
