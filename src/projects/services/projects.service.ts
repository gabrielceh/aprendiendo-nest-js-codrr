import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { ProjectsEntity } from '../entities/projects.entity';
import { ProjectDTO } from '../dto/project.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UserDTO } from 'src/users/dto/user.dto';
import { UserProjectsEntity } from 'src/users/entities/usersProjects.entity';
import { ACCESS_LEVEL } from 'src/constants';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectRepository: Repository<ProjectsEntity>,
    @InjectRepository(UserProjectsEntity)
    private readonly userProjectRepository: Repository<UserProjectsEntity>,
    private readonly userService: UsersService,
  ) {}

  public async createProject(body: ProjectDTO, userId: string): Promise<any> {
    try {
      const user = await this.userService.findUserById(userId);
      // creamaos el proyecto
      const project = await this.projectRepository.save(body);
      // Cuando el usuario con rol CREATE cre un nuevo proyecto, será asignado a este
      return await this.userProjectRepository.save({
        accessLevel: ACCESS_LEVEL.OWNER,
        user: user,
        project,
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findProjects(): Promise<ProjectsEntity[]> {
    try {
      const projectsFound: Array<ProjectsEntity> =
        await this.projectRepository.find();

      if (projectsFound.length === 0)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No hay resultados',
        });
      return projectsFound;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findProjectById(id: string): Promise<ProjectsEntity> {
    try {
      const projectFound: ProjectsEntity = await this.projectRepository
        .createQueryBuilder('project')
        .where({ id })
        .leftJoinAndSelect('project.usersIncludes', 'usersIncludes')
        .leftJoinAndSelect('usersIncludes.user', 'user')
        .select([
          'project',
          'usersIncludes',
          'user.id',
          'user.username',
          'user.firstName',
          'user.lastName',
          'user.email',
          'user.role',
        ])
        .getOne();

      if (!projectFound)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró un proyecto',
        });

      return projectFound;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateProject(
    id: string,
    body: ProjectDTO,
  ): Promise<UpdateResult> {
    try {
      const project: UpdateResult = await this.projectRepository.update(
        id,
        body,
      );

      if (project.affected === 0)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar el proyecto',
        });

      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteProject(id: string): Promise<DeleteResult> {
    try {
      const project: DeleteResult = await this.projectRepository.delete(id);

      if (project.affected === 0)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo borrar el proyecto',
        });

      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
