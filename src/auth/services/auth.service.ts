import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersEntity } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/services/users.service';
import { AuthResponse, PayloadToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  // Validamos que exista el usuario
  public async validateUser(username: string, password: string) {
    const userByUsername = await this.userService.findBy({
      key: 'username',
      value: username,
    });
    const userByEmail = await this.userService.findBy({
      key: 'email',
      value: username,
    });

    if (userByUsername) {
      // comparamos las contraseñas
      const match = await bcrypt.compare(password, userByUsername.password);
      if (match) return userByUsername;
    }

    if (userByEmail) {
      // comparamos las contraseñas
      const match = await bcrypt.compare(password, userByEmail.password);
      if (match) return userByEmail;
    }

    return null;
  }

  // creamos el token
  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }): string {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  // creamos la respuesta para el login
  public async generateJWT(user: UsersEntity): Promise<AuthResponse> {
    const getUser = await this.userService.findUserById(user.id);

    const payload: PayloadToken = {
      role: getUser.role,
      sub: getUser.id,
    };

    return {
      accessToken: this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: '1h',
      }),
      user,
    };
  }
}
