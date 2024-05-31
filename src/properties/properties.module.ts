import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { PropertyImage } from './entities/property_image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property, PropertyImage])],
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [PropertiesService, TypeOrmModule],
})
export class PropertiesModule {}
