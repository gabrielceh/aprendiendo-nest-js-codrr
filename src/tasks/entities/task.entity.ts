import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { STATUS_TASK } from '../../constants';
import { BaseEntity } from '../../config/base.entity';
import { ProjectsEntity } from '../../projects/entities/projects.entity';

@Entity({ name: 'task' })
export class TasksEntity extends BaseEntity {
  @Column()
  taskName: string;

  @Column()
  taskDescription: string;

  @Column()
  responsableName: string;

  @Column({ type: 'enum', enum: STATUS_TASK, default: STATUS_TASK.CREATED })
  status: STATUS_TASK;

  // Many to One: muchas tareas para un proyecto
  @ManyToOne(() => ProjectsEntity, (project) => project.tasks)
  @JoinColumn({
    name: 'project_id',
  })
  project: ProjectsEntity;
}
