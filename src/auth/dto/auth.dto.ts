import { IsNotEmpty, IsString } from 'class-validator';
import { AuthBody } from '../interfaces/auth.interface';

export class AuthBodyDTO implements AuthBody {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
