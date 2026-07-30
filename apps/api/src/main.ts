import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }),
  );

  app.use(
    helmet({
      // This API only returns JSON and serves uploaded files — it never renders HTML itself,
      // so a CSP tuned for that would be inert at best and risks blocking something unexpected.
      contentSecurityPolicy: false,
      // Uploaded images/documents are meant to be embedded by apps/web and apps/dashboard,
      // which run on different origins — helmet's default same-origin policy would block that.
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim());
  app.enableCors({ origin: allowedOrigins });

  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
