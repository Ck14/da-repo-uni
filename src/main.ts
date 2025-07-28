import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://167.88.46.48:3000'], // Incluye tanto localhost como la IP de producción
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.setGlobalPrefix('api'); // Agrega el prefijo /api/ a todas las rutas
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3100;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
