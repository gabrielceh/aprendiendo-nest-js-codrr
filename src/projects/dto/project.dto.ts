import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class ProjectDTO {
  @ApiProperty() // para la documentacion con swagger
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty() // para la documentacion con swagger
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class ProjectUpdateDTO {
  @ApiProperty() // para la documentacion con swagger
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty() // para la documentacion con swagger
  @IsOptional()
  @IsString()
  description: string;
}
