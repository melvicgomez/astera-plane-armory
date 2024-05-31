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
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { User } from 'src/users/entities/user.entity';
import { MulterFile } from 'src/models/multerfile';
import { CreatePropertyImageDto } from './dto/create-property-image.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { imageFileFilter } from 'src/helpers';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  create(
    @Req() request: Request,
    @Body() createPropertyDto: CreatePropertyDto,
  ) {
    const user = request['user'] as User;
    return this.propertiesService.create(user.user_id, createPropertyDto);
  }

  @Get()
  findAll(
    @Query('includeImage') includeImage: boolean,
    @Query('includeProject') includeProject: boolean,
    @Query('includeProjectImage') includeProjectImage: boolean,
  ) {
    return this.propertiesService.findAll(
      includeImage,
      includeProject,
      includeProjectImage,
    );
  }

  @Get(':property_id')
  findOne(
    @Param('property_id') property_id: string,
    @Query('includeImage') includeImage: boolean,
    @Query('includeProject') includeProject: boolean,
    @Query('includeProjectImage') includeProjectImage: boolean,
  ) {
    return this.propertiesService.findOne(
      property_id,
      includeImage,
      includeProject,
      includeProjectImage,
    );
  }

  @Patch(':property_id')
  update(
    @Param('property_id') property_id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(property_id, updatePropertyDto);
  }

  @Delete(':property_id')
  remove(@Param('property_id') property_id: string) {
    return this.propertiesService.remove(property_id);
  }

  @Post(':property_id/images')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads/property_images',
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
    @Param('property_id') property_id: string,
    @Req() request: Request,
    @UploadedFiles() files: MulterFile[],
    @Body() createPropertyImageDto: CreatePropertyImageDto,
  ) {
    const user = request['user'] as User;
    return this.propertiesService.addProjectImages(
      property_id,
      user.user_id,
      files,
      createPropertyImageDto,
    );
  }

  @Delete(':property_id/images/:image_id')
  removeProjectImage(
    @Param('property_id') property_id: string,
    @Param('image_id') image_id: number,
  ) {
    return this.propertiesService.removeProjectImage(property_id, image_id);
  }
}
