import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';
import { STATUS_TASK } from 'src/constants';
import { ProjectDTO } from 'src/projects/dto/project.dto';

export class TasksDTO {
  @ApiProperty() // para la documentacion con swagger
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @ApiProperty() // para la documentacion con swagger
  @IsNotEmpty()
  @IsString()
  taskDescription: string;

  @ApiProperty() // para la documentacion con swagger
  @IsOptional()
  @IsEnum(STATUS_TASK)
  status?: STATUS_TASK;

  @ApiProperty() // para la documentacion con swagger
  @IsNotEmpty()
  @IsString()
  responsableName: string;

  @ApiProperty() // para la documentacion con swagger
  @IsOptional()
  project?: ProjectDTO;
}
