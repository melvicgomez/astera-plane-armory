import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from './property.entity';

@Entity({
  name: 't_property_images',
})
export class PropertyImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  property_id: string;

  @Column({ type: 'uuid' })
  added_by: string;

  @Column()
  filename: string;

  @Column()
  is_migrated: boolean;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @ManyToOne(() => Property, (property) => property.images, {
    cascade: true,
  })
  @JoinColumn({
    name: 'property_id',
  })
  property: Property;
}
