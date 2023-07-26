import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly useRepository: Repository<UsersEntity>,
  ) {}

  public async createUser(body: UserDTO): Promise<UsersEntity> {
    try {
      return await this.useRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findUsers(): Promise<UsersEntity[]> {
    try {
      // Obtenemos todos los usuarios
      return await this.useRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findUserById(id: string): Promise<UsersEntity> {
    try {
      // Obtenemos un usuario
      return await this.useRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateUser(
    id: string,
    body: UserUpdateDTO,
  ): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.useRepository.update(id, body);
      // si no actualiza
      if (user.affected === 0) {
        return undefined;
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.useRepository.delete(id);
      // si no actualiza
      if (user.affected === 0) {
        return undefined;
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
