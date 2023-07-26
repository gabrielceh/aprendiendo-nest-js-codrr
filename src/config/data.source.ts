/* npm install --save @nestjs/typeorm typeorm pg // pg es porque trabajamos con postgreSQL
	npm i typeorm-naming-strategies
*/
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV.trim()}.env`,
});
// Obtenemos las variables de entorno
const configService = new ConfigService();

export const DATASOURCECONFIG: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'), // your username here
  password: configService.get('DB_PASSWORD'), //your password here
  database: configService.get('DB_NAME'), // database name goes here. If you don't have one create a new empty
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDS = new DataSource(DATASOURCECONFIG);
