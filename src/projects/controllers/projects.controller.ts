import {
  Body,
  Controller,
  Post,
  ParseUUIDPipe,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/project.dto';

@Controller('projects')
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

  @Get(':id')
  public async findProjectById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.projectService.findProjectById(id);
  }

  @Patch('edit/:id')
  public async editProject(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: ProjectUpdateDTO,
  ) {
    return await this.projectService.updateProject(id, body);
  }

  @Delete('delete/:id')
  public async deleteProject(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.projectService.deleteProject(id);
  }
}
