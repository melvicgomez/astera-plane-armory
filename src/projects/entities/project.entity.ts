import {
  BuildingAccreditation,
  ProjectGrade,
  ProjectProximity,
  ProjectType,
  TelcoProviders,
} from 'src/models/project';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectImage } from './project_image.entity';
import { Property } from 'src/properties/entities/property.entity';

@Entity({
  name: 't_projects',
})
export class Project {
  @PrimaryGeneratedColumn()
  project_id: string;

  @Column({
    type: 'uuid',
  })
  added_by: string;

  @Column()
  description: string;

  @Column()
  short_description: string;

  @Column({ type: 'character varying' })
  slug: string;

  @Column({ type: 'character varying', array: true })
  tags: string[];

  @Column({
    type: 'text',
    array: true,
    nullable: true,
    transformer: {
      to(value: ProjectProximity[]) {
        return (value || []).map((v) => JSON.stringify(v));
      },
      from(value: string[]): ProjectProximity[] {
        return (value || []).map((v) => JSON.parse(v));
      },
    },
  })
  proximities: ProjectProximity[];

  @Column()
  project_name: string;

  @Column()
  street_name_1: string;

  @Column()
  street_name_2: string;

  @Column()
  barangay: string;

  @Column()
  city: string;

  @Column()
  province: string;

  @Column()
  region: string;

  @Column()
  postal_code: number;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @Column({ type: 'enum', enum: ProjectType })
  project_type: ProjectType;

  @Column({ type: 'enum', enum: ProjectGrade })
  class_type: ProjectGrade;

  @Column({ type: 'enum', enum: BuildingAccreditation })
  accreditation: BuildingAccreditation;

  @Column({ type: 'character varying', enum: TelcoProviders, array: true })
  telco_providers: TelcoProviders[];

  @Column({ type: 'character varying', nullable: true, array: true })
  property_features: string[];

  @Column({ type: 'character varying', nullable: true, array: true })
  back_ups: string[];

  @Column()
  year_built: number;

  @Column()
  floor_count: number;

  @Column()
  elevator_count: number;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @OneToMany(() => ProjectImage, (projectImage) => projectImage.project)
  @JoinColumn({
    name: 'project_id',
  })
  images: ProjectImage[];

  @OneToMany(() => Property, (property) => property.project)
  @JoinColumn({
    name: 'project_id',
  })
  properties: Property[];
}
