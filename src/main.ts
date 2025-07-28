import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'], // o '*' para todos los orígenes (no recomendado en producción)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.setGlobalPrefix('api'); // Agrega el prefijo /api/ a todas las rutas
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3100;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
