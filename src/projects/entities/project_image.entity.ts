import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './project.entity';

@Entity({
  name: 't_project_images',
})
export class ProjectImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  project_id: string;

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

  @ManyToOne(() => Project, (project) => project.images, {
    cascade: true,
  })
  @JoinColumn({
    name: 'project_id',
  })
  project: Project;
}
