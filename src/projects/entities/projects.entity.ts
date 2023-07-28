import { Column, Entity, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger/dist';
import { IProject } from 'interfaces/project.interface';
// importar todas la entidades sin el src
import { BaseEntity } from '../../config/base.entity';
import { UserProjectsEntity } from '../../users/entities/usersProjects.entity';
import { TasksEntity } from '../../tasks/entities/task.entity';

@Entity({ name: 'projects' })
export class ProjectsEntity extends BaseEntity implements IProject {
  @ApiProperty() // para la documentacion con swagger
  @Column()
  name: string;
  @ApiProperty() // para la documentacion con swagger
  @Column()
  description: string;

  // campo para hacer la relacion entre usuario y proyecto
  @ApiProperty() // para la documentacion con swagger
  @OneToMany(() => UserProjectsEntity, (usersProjects) => usersProjects.project)
  usersIncludes: UserProjectsEntity[];

  //One to Many: Un proyecto puede tener muchas tareas
  @ApiProperty() // para la documentacion con swagger
  @OneToMany(() => TasksEntity, (tasks) => tasks.project)
  tasks: TasksEntity[];
}

// Para crear las tablas, agregamos unos scripts en el package.json
// "orm:init": "typeorm-ts-node-esm -d ./src/config/data.source.ts",
// "m:gen": "SET NODE_ENV=develop && npm run orm:init migration:generate",
// "m:run": "SET NODE_ENV=develop && npm run orm:init migration:run"
// corremos npm run m:gen -- ./migrations/init
// luego npm run m:run
