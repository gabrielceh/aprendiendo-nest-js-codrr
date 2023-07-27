import { ROLES } from 'src/constants';
import { UsersEntity } from 'src/users/entities/users.entity';

export interface PayloadToken {
  sub: string;
  role: ROLES;
}

export interface AuthBody {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: UsersEntity;
}
