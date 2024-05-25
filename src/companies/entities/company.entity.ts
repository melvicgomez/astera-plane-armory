import { Contact } from 'src/contacts/entities/contact.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 't_companies' })
export class Company {
  @PrimaryGeneratedColumn()
  company_id: number;

  @Column({
    type: 'text',
  })
  company_name: string;

  @Column({
    type: 'text',
  })
  city: string;

  @Column({
    type: 'character varying',
  })
  region: string;

  @Column({
    type: 'text',
  })
  province: string;

  @Column({ type: 'text' })
  postal_code: string;

  @Column({ type: 'text' })
  barangay: string;

  @Column({ type: 'text' })
  street_name_1: string;

  @Column({ type: 'text' })
  street_name_2: string;

  @Column({ type: 'character varying' })
  logo_slug: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @OneToMany(() => Contact, (contact) => contact.company)
  @JoinColumn({ name: 'company_id' })
  contact_persons: Contact[];
}
