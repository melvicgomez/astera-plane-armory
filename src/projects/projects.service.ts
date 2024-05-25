import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectImage } from './entities/project_image.entity';
import { CreateProjectImageDto } from './dto/create-project-image.dto';
import { MulterFile } from 'src/models/multerfile';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(ProjectImage)
    private projectImagesRepository: Repository<ProjectImage>,
  ) {}

  create(user_id: string, createProjectDto: CreateProjectDto) {
    return this.projectsRepository.save({
      ...createProjectDto,
      added_by: user_id,
    });
  }

  async addProjectImages(
    projectId: string,
    userId: string,
    files: MulterFile[],
    projectImage: CreateProjectImageDto,
  ) {
    const filesToSave = files.map(
      (file): CreateProjectImageDto => ({
        added_by: userId,
        project_id: projectId,
        filename: file.filename,
        is_migrated: `${projectImage.is_migrated}` === 'true',
      }),
    );
    return this.projectImagesRepository.save(filesToSave);
  }

  findAll(includeImage: boolean = false) {
    if (includeImage) {
      return this.projectsRepository.find({
        relations: ['images'],
      });
    }
    return this.projectsRepository.find();
  }

  findOne(project_id: string, includeImage: boolean = false) {
    if (includeImage) {
      return this.projectsRepository.findOne({
        where: {
          project_id,
        },
        relations: ['images'],
      });
    }
    return this.projectsRepository.findOne({
      where: {
        project_id,
      },
    });
  }

  update(project_id: string, updateProjectDto: UpdateProjectDto) {
    return this.projectsRepository.update(project_id, updateProjectDto);
  }

  remove(project_id: string) {
    return this.projectsRepository.delete({
      project_id,
    });
  }

  removeProjectImage(project_id: string, image_id: number) {
    return this.projectImagesRepository.delete({
      id: image_id,
      project_id,
    });
  }
}
