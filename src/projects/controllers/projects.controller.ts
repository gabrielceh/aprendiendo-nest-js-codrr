import {
  Body,
  Controller,
  Post,
  ParseUUIDPipe,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/project.dto';
import { AccessLevelGuard, AuthGuard, RolesGuard } from 'src/auth/guards';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('projects')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Roles('CREATOR')
  @Post('create/user-owner/:userId')
  public async registerProject(
    @Body() body: ProjectDTO,
    @Param('userId') userId: string,
  ) {
    return await this.projectService.createProject(body, userId);
  }

  @Get('all')
  public async findAllProject() {
    return await this.projectService.findProjects();
  }

  @Get(':projectId')
  public async findProjectById(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
  ) {
    return await this.projectService.findProjectById(projectId);
  }

  @AccessLevel('OWNER')
  @Patch('edit/:projectId')
  public async editProject(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Body() body: ProjectUpdateDTO,
  ) {
    return await this.projectService.updateProject(projectId, body);
  }

  @Delete('delete/:projectId')
  public async deleteProject(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
  ) {
    return await this.projectService.deleteProject(projectId);
  }
}
