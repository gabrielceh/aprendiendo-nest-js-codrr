/**PAQUETES
 * https://docs.nestjs.com/techniques/configuration: npm i --save @nestjs/config: Para configurar los dif environments
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATASOURCECONFIG } from './config/data.source';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      //en el package.json, en los scripts "start:dev": "SET NODE_ENV=develop && nest start --watch",
      envFilePath: `.${process.env.NODE_ENV.trim()}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...DATASOURCECONFIG }), // iniciamos el TypeOrmModule
    UsersModule,
    ProjectsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
