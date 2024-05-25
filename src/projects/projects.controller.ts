import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectImageDto } from './dto/create-project-image.dto';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MulterFile } from 'src/models/multerfile';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { imageFileFilter } from 'src/helpers';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Req() request: Request, @Body() createProjectDto: CreateProjectDto) {
    const user = request['user'] as User;
    return this.projectsService.create(user.user_id, createProjectDto);
  }

  @Get()
  findAll(@Query('includeImage') includeImage: boolean) {
    return this.projectsService.findAll(includeImage);
  }

  @Get(':project_id')
  findOne(
    @Param('project_id') project_id: string,
    @Query('includeImage') includeImage: boolean,
  ) {
    return this.projectsService.findOne(project_id, includeImage);
  }

  @Patch(':project_id')
  update(
    @Param('project_id') project_id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(project_id, updateProjectDto);
  }

  @Delete(':project_id')
  remove(@Param('project_id') project_id: string) {
    return this.projectsService.remove(project_id);
  }

  @Post(':project_id/images')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads/project_images',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  addProjectImages(
    @Param('project_id') project_id: string,
    @Req() request: Request,
    @UploadedFiles() files: MulterFile[],
    @Body() createProjectImageDto: CreateProjectImageDto,
  ) {
    const user = request['user'] as User;
    return this.projectsService.addProjectImages(
      project_id,
      user.user_id,
      files,
      createProjectImageDto,
    );
  }
  @Delete(':project_id/images/:image_id')
  removeProjectImage(
    @Param('project_id') project_id: string,
    @Param('image_id') image_id: number,
  ) {
    return this.projectsService.removeProjectImage(project_id, image_id);
  }
}
