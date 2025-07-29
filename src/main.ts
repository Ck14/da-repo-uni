import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',           // Desarrollo local
      'http://167.88.46.48:3000',        // IP directa
      'http://chimaltransparente.org',   // Dominio principal
      'https://chimaltransparente.org',  // Dominio con HTTPS
      'http://www.chimaltransparente.org', // Subdominio www
      'https://www.chimaltransparente.org' // Subdominio www con HTTPS
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.setGlobalPrefix('api'); // Agrega el prefijo /api/ a todas las rutas
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3100;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
