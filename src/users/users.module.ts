import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UsersEntity } from './entities/users.entity';
import { UserProjectsEntity } from './entities/usersProjects.entity';

@Module({
  // Le pasamos el TypeOrmModule junto con las entidades(tablas) que vamos a afectar
  imports: [TypeOrmModule.forFeature([UsersEntity, UserProjectsEntity])],
  providers: [UsersService],
  controllers: [UsersController],
  // exportamos para poder usar en el modulo de Auth
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
