import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PropertyImage } from './property_image.entity';
import { Project } from 'src/projects/entities/project.entity';

@Entity({
  name: 't_properties',
})
export class Property {
  @PrimaryGeneratedColumn()
  property_id: string;

  @Column()
  property_name: string;

  @Column({
    type: 'uuid',
  })
  project_id: string;

  @Column({ type: 'character varying', array: true })
  perferred_tenants: string[];

  @Column()
  end_of_contract: string;

  @Column({
    type: 'uuid',
  })
  added_by: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @Column({ type: 'text', array: true })
  turnover_remarks: string[];

  @Column({ type: 'character varying', array: true })
  telco_providers: string[];

  @Column({ type: 'character varying', array: true })
  electricity_backup: string[];

  @Column()
  operating_hours: string;

  @Column()
  floor_level: number;

  @Column()
  aircon_operation: string;

  @Column()
  frontage_area: number;

  @Column()
  lot_area: number;

  @Column()
  min_lease_term: number; // by years

  @Column()
  max_lease_term: number;

  @Column()
  cusa_rate: number;

  @Column()
  min_rental_rate: number;
  @Column()
  max_rental_rate: number;

  @Column()
  leasable_area: number;

  @Column()
  alfresco_area: number;
  @Column()
  alfresco_rental_rate: number;
  @Column()
  alfresco_cusa_rate: number;

  @OneToMany(() => PropertyImage, (propertyImage) => propertyImage.property)
  @JoinColumn({
    name: 'property_id',
  })
  images: PropertyImage[];

  @ManyToOne(() => Project, (project) => project.properties, {
    cascade: true,
  })
  @JoinColumn({
    name: 'project_id',
  })
  project: Project;
}
