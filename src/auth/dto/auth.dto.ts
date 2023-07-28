import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';
import { AuthBody } from '../interfaces/auth.interface';

export class AuthBodyDTO implements AuthBody {
  @ApiProperty() // para la documentacion con swagger
  @IsNotEmpty()
  username: string;

  @ApiProperty() // para la documentacion con swagger
  @IsNotEmpty()
  @IsString()
  password: string;
}
