import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyImage } from './entities/property_image.entity';
import { MulterFile } from 'src/models/multerfile';
import { CreatePropertyImageDto } from './dto/create-property-image.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
    @InjectRepository(PropertyImage)
    private propertyImagesRepository: Repository<PropertyImage>,
  ) {}

  create(user_id: string, createPropertyDto: CreatePropertyDto) {
    // TODO: throw an error if no project ID is added
    // TODO: Validation
    return this.propertiesRepository.save({
      ...createPropertyDto,
      added_by: user_id,
    });
  }

  findAll(
    includeImage: boolean = false,
    includeProject: boolean = false,
    includeProjectImage: boolean = false,
  ) {
    const relations = [];

    if (includeImage) relations.push('images');
    if (includeProject) relations.push('project');
    if (includeProjectImage) relations.push('project.images');

    return this.propertiesRepository.find({
      relations,
    });
  }

  findOne(
    property_id: string,
    includeImage: boolean = false,
    includeProject: boolean = false,
    includeProjectImage: boolean = false,
  ) {
    const relations = [];

    if (includeImage) relations.push('images');
    if (includeProject) relations.push('project');
    if (includeProjectImage) relations.push('project.images');

    return this.propertiesRepository.findOne({
      where: {
        property_id,
      },
      relations,
    });
  }

  update(property_id: string, updatePropertyDto: UpdatePropertyDto) {
    // TODO: throw an error if no project ID is added
    // TODO: Validation
    return this.propertiesRepository.update(property_id, updatePropertyDto);
  }

  remove(property_id: string) {
    return this.propertiesRepository.delete({
      property_id,
    });
  }

  addProjectImages(
    property_id: string,
    user_id: string,
    files: MulterFile[],
    property_image: CreatePropertyImageDto,
  ) {
    const filesToSave = files.map(
      (file): CreatePropertyImageDto => ({
        added_by: user_id,
        property_id,
        filename: file.filename,
        is_migrated: `${property_image.is_migrated}` === 'true',
      }),
    );
    return this.propertyImagesRepository.save(filesToSave);
  }

  removeProjectImage(property_id: string, image_id: number) {
    return this.propertyImagesRepository.delete({
      id: image_id,
      property_id,
    });
  }
}
