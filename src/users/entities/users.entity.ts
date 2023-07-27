import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IUser } from 'interfaces/user.interface';
import { ROLES } from '../../constants';
import { BaseEntity } from '../../config/base.entity';
import { UserProjectsEntity } from './usersProjects.entity';

// Creamos la entidad del usuario
// hara relacion a una tabla en la base de datos
// El decorador Entity hace lo anterios posible
@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  // Excluimos el password para no enviarlo
  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;

  // campo para hacer la relacion entre usuario y proyecto
  @OneToMany(() => UserProjectsEntity, (usersProjects) => usersProjects.user)
  projectsIncludes: Array<UserProjectsEntity>;
}
