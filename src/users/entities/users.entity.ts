import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger/dist';
import { IUser } from 'interfaces/user.interface';
import { ROLES } from '../../constants';
import { BaseEntity } from '../../config/base.entity';
import { UserProjectsEntity } from './usersProjects.entity';

// Creamos la entidad del usuario
// hara relacion a una tabla en la base de datos
// El decorador Entity hace lo anterios posible
@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
  @ApiProperty() // para la documentacion con swagger
  @Column()
  firstName: string;

  @ApiProperty() // para la documentacion con swagger
  @Column()
  lastName: string;

  @ApiProperty() // para la documentacion con swagger
  @Column()
  age: number;

  @ApiProperty() // para la documentacion con swagger
  @Column({ unique: true })
  email: string;

  @ApiProperty() // para la documentacion con swagger
  @Column({ unique: true })
  username: string;

  // Excluimos el password para no enviarlo
  @ApiProperty() // para la documentacion con swagger
  @Exclude()
  @Column()
  password: string;

  @ApiProperty() // para la documentacion con swagger
  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;

  // campo para hacer la relacion entre usuario y proyecto
  @ApiProperty() // para la documentacion con swagger
  @OneToMany(() => UserProjectsEntity, (usersProjects) => usersProjects.user)
  projectsIncludes: Array<UserProjectsEntity>;
}
