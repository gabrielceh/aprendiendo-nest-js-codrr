import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { ProjectsEntity } from '../entities/projects.entity';
import { ProjectDTO } from '../dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectRepository: Repository<ProjectsEntity>,
  ) {}

  public async createProject(body: ProjectDTO): Promise<ProjectsEntity> {
    try {
      return this.projectRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findProjects(): Promise<ProjectsEntity[]> {
    try {
      return this.projectRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findProjectById(id: string): Promise<ProjectsEntity> {
    try {
      return this.projectRepository
        .createQueryBuilder('project')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new Error(error);
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

      if (project.affected === 0) return undefined;

      return project;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async deleteProject(id: string): Promise<DeleteResult> {
    try {
      const project: DeleteResult = await this.projectRepository.delete(id);

      if (project.affected === 0) return undefined;

      return project;
    } catch (error) {
      throw new Error(error);
    }
  }
}
