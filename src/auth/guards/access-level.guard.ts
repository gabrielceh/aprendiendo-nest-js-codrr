import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import {
  ACCESS_KEY,
  ADMIN_KEY,
  PUBLIC_KEY,
  ROLES,
  ROLES_KEY,
} from 'src/constants';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
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

    const accesLevel = this.reflector.get<number>(
      ACCESS_KEY,
      context.getHandler(),
    );

    // obtenemos el admin
    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    // obtenemos la request
    const req = context.switchToHttp().getRequest<Request>();

    const { roleUser, idUser } = req;

    // en caso de no requerir un nivel de acceso
    if (accesLevel === undefined) {
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
    }

    // Si es admin si o si pasa, sin importar si es basic o no
    if (roleUser === ROLES.ADMIN) {
      return true;
    }

    // obtenemos el usuario
    const user = await this.userService.findUserById(idUser);
    // buscamos si el usuario existe en el proyecto
    const userExistInProject = user.projectsIncludes.find(
      (project) => project.project.id === req.params.projectId,
    );

    if (userExistInProject === undefined) {
      throw new UnauthorizedException('El usuario no pertenece al proyecto');
    }

    // si el usuario existe, validamos su nivel de acceso
    if (accesLevel !== userExistInProject.accessLevel) {
      throw new UnauthorizedException(
        'El usuario no tiene el nivel de acceso necesario',
      );
    }

    return true;
  }
}
