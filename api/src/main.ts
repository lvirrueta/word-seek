import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const cors = {
  origin: '*',
  methods: 'GET,HEAD,PUT,POST,DELETE',
  allowedHeaders: 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors });
  await app.listen(3000);
}
bootstrap();
