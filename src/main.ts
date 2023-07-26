/**PAQUETES
 *https://docs.nestjs.com/techniques/configuration: npm i --save @nestjs/config: Para configurar los dif environments
 * npm install --save @nestjs/typeorm typeorm pg // pg es porque trabajamos con postgreSQL
 * npm i typeorm-naming-strategies
 * npm i --save class-validator class-transformer
 * npm i morgan
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './constants';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));

  // Habilitanos las validaciones globales de class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // consultamos el ConfigService
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  // console.log(configService.get('PORT'));

  app.enableCors(CORS);

  app.setGlobalPrefix('api/codrr');

  await app.listen(PORT);
  console.log(`App running on: ${await app.getUrl()}`);
}
bootstrap();
