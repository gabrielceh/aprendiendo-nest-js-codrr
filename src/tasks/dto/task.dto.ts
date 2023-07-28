import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { STATUS_TASK } from 'src/constants';
import { ProjectDTO } from 'src/projects/dto/project.dto';

export class TasksDTO {
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @IsNotEmpty()
  @IsString()
  taskDescription: string;

  @IsOptional()
  @IsEnum(STATUS_TASK)
  status?: STATUS_TASK;

  @IsNotEmpty()
  @IsString()
  responsableName: string;

  @IsOptional()
  project?: ProjectDTO;
}
