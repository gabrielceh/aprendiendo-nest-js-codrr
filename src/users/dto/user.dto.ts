import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';
import { ACCESS_LEVEL, ROLES } from 'src/constants';
import { UsersEntity } from '../entities/users.entity';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';

export class UserDTO {
  @ApiProperty() // para la documentacion con swagger
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty() // para la documentacion con swagger
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty() // para la documentacion con swagger
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty() // para la documentacion con swagger
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty() // para la documentacion con swagger
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty() // para la documentacion con swagger
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty() // para la documentacion con swagger
  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;
}

export class UserUpdateDTO {
  @ApiProperty() // para la documentacion con swagger
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty() // para la documentacion con swagger
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty() // para la documentacion con swagger
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty() // para la documentacion con swagger
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty() // para la documentacion con swagger
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty() // para la documentacion con swagger
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty() // para la documentacion con swagger
  @IsOptional()
  @IsEnum(ROLES)
  role?: ROLES;
}

export class UserToProjectDTO {
  @ApiProperty() // para la documentacion con swagger
  @IsNotEmpty()
  @IsUUID()
  user: UsersEntity;

  @ApiProperty() // para la documentacion con swagger
  @IsNotEmpty()
  @IsUUID()
  project: ProjectsEntity;

  @ApiProperty() // para la documentacion con swagger
  @IsNotEmpty()
  @IsEnum(ACCESS_LEVEL)
  accessLevel: ACCESS_LEVEL;
}
