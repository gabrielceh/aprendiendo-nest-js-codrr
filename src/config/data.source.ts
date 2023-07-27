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

// En el package.json se agregaron unos scripts para poder ejecutar las migraciones
// 			"orm:init": "typeorm-ts-node-esm -d ./src/config/data.source.ts",
//     "m:gen": "SET NODE_ENV=develop && npm run orm:init migration:generate",
//     "m:run": "SET NODE_ENV=develop && npm run orm:init migration:run"

//  npm run m:gen -- src/migrations/init
//  npm run m:run
// luego borrar la carpeta dist
