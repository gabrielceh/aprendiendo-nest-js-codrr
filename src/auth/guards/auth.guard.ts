import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PUBLIC_KEY } from 'src/constants';
import { UsersService } from 'src/users/services/users.service';
import { useToken } from 'src/utils/useToken';
import { IUseToken } from '../interfaces/auth.interface';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  // Inyectamos:
  // UserService pata usar los uaseServices
  // Reflector: pata usar atributos de decoradores
  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    // leemos el decorador publico que creamos
    const isPublic = this.reflector.get<boolean>(
      // le pasamos su key
      PUBLIC_KEY,
      // llame al contexto para que entienda al decorador
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    // leemos la request que nos llega
    const req = context.switchToHttp().getRequest<Request>();
    // recibimos el token
    const token = req.headers['auth_token'];

    // validamos si recibimos el token
    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Token invalido');
    }

    // leemos el token
    const manageToken: IUseToken | string = useToken(token);

    if (typeof manageToken === 'string')
      throw new UnauthorizedException(manageToken);

    if (manageToken.isExpired)
      throw new UnauthorizedException('Token ha expirado');

    // obtenemos el id del usuario y buscamos al usuario por el id
    const { sub } = manageToken;
    const user = await this.userService.findUserById(sub);

    // Validamos que el usuario exista
    if (!user) throw new UnauthorizedException('Usuario invalido');

    req.idUser = user.id;
    req.roleUser = user.role;

    return true;
  }
}
