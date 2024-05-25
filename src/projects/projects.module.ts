import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity';
import { ProjectImage } from './entities/project_image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [TypeOrmModule.forFeature([Project, ProjectImage])],
  exports: [ProjectsService, TypeOrmModule],
})
export class ProjectsModule {}
