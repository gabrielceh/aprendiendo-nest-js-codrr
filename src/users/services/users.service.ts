import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from '../entities/users.entity';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UserProjectsEntity } from '../entities/usersProjects.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly useRepository: Repository<UsersEntity>,
    @InjectRepository(UserProjectsEntity)
    private readonly UserProjectRepository: Repository<UserProjectsEntity>,
  ) {}

  public async createUser(body: UserDTO): Promise<UsersEntity> {
    try {
      // Hasheamos la contraseña del usuario

      body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.useRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async relationToProject(body: UserToProjectDTO) {
    try {
      return await this.UserProjectRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUsers(): Promise<UsersEntity[]> {
    try {
      // Obtenemos todos los usuarios
      const users: Array<UsersEntity> = await this.useRepository.find();
      if (users.length === 0)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No hay resultados',
        });
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUserById(id: string): Promise<UsersEntity> {
    try {
      // Obtenemos un usuario
      const userFound: UsersEntity = await this.useRepository
        .createQueryBuilder('user')
        .where({ id })
        // Agregamos la relacion.
        // el primer valor representa la tabla y el campo de la tabla cuando hace el join y el sgundo representa el valor
        .leftJoinAndSelect('user.projectsIncludes', 'projectsIncludes')
        .leftJoinAndSelect('projectsIncludes.project', 'project')
        .getOne();

      if (!userFound)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró al usuario',
        });

      return userFound;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //Esta funcion recibe una key y un value
  // La key representa la columna a buscar y el value el valor
  public async findBy({ key, value }: { key: keyof UserDTO; value: any }) {
    try {
      // Obtenemos un usuario
      const userFound: UsersEntity = await this.useRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ [key]: value })
        .getOne();
      console.log(userFound, 'linea 89');

      return userFound;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateUser(
    id: string,
    body: UserUpdateDTO,
  ): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.useRepository.update(id, body);
      // si no actualiza
      if (user.affected === 0)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.useRepository.delete(id);
      // si no actualiza
      if (user.affected === 0)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo borrar',
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
