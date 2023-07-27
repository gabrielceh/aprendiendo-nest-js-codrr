import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ADMIN_KEY, PUBLIC_KEY, ROLES, ROLES_KEY } from 'src/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      // le pasamos su key
      PUBLIC_KEY,
      // llame al contexto para que entienda al decorador
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    //Obtenemos el/los rol(es) del decorador
    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      // le pasamos su key
      ROLES_KEY,
      // llame al contexto para que entienda al decorador
      context.getHandler(),
    );

    // obtenemos el admin
    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    // obtenemos la request
    const req = context.switchToHttp().getRequest<Request>();

    const { roleUser } = req;

    // validamos si no enviamos rol, o si es BASIC
    if (roles === undefined) {
      // Si Admin no existe puede pasar, ya que no tiene el decorador admin, y no es necesario que lo sea
      if (!admin) {
        return true;
      }
      // si admin existe y el rolUser de la reques es igual al admin, pasa
      else if (admin && roleUser === admin) {
        return true;
      }
      // No pasa ya que necesita ser admin
      else {
        throw new UnauthorizedException(
          'No tienes permiso para esta operación',
        );
      }
    }

    // Si es admin si o si pasa, sin importar si es basic o no
    if (roleUser === ROLES.ADMIN) {
      return true;
    }

    // validamos que el rol(es) sea igual al rol del usuario
    const isAuth = roles.some((role) => role === roleUser);

    // si no es igual, fuera
    if (!isAuth) {
      throw new UnauthorizedException('No tienes permiso para esra operacion');
    }

    return true;
  }
}
