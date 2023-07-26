import { Column, Entity, OneToMany } from 'typeorm';
import { IProject } from 'interfaces/project.interface';
import { BaseEntity } from '../../config/base.entity';
import { UserProjectsEntity } from '../../users/entities/usersProjects.entity';

@Entity({ name: 'projects' })
export class ProjectsEntity extends BaseEntity implements IProject {
  @Column()
  name: string;
  @Column()
  description: string;

  // campo para hacer la relacion entre usuario y proyecto
  @OneToMany(() => UserProjectsEntity, (usersProjects) => usersProjects.project)
  usersIncludes: UserProjectsEntity;
}

// Para crear las tablas, agregamos unos scripts en el package.json
// "orm:init": "typeorm-ts-node-esm -d ./src/config/data.source.ts",
// "m:gen": "SET NODE_ENV=develop && npm run orm:init migration:generate",
// "m:run": "SET NODE_ENV=develop && npm run orm:init migration:run"
// corremos npm run m:gen -- ./migrations/init
// luego npm run m:run
