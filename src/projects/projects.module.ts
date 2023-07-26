import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './services/projects.service';
import { ProjectsEntity } from './entities/projects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsEntity])],
  providers: [ProjectsService],
})
export class ProjectsModule {}
