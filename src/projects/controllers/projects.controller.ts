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
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';

@Controller('projects')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post('register')
  public async registerProject(@Body() body: ProjectDTO) {
    return await this.projectService.createProject(body);
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

  @AccessLevel(50)
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
