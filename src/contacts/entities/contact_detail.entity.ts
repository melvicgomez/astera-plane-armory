import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contact } from './contact.entity';
import { ContactType } from '../models/contact';

@Entity({ name: 't_contact_person_details' })
export class ContactDetail {
  @PrimaryGeneratedColumn('increment')
  contact_detail_id: number;

  @Column({ type: 'uuid' })
  contact_person_id: string;

  @Column({ type: 'enum', enum: ContactType })
  type: ContactType;

  @Column()
  value: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @ManyToOne(() => Contact, (contact) => contact.contact_details)
  @JoinColumn({ name: 'contact_person_id' })
  contact: Contact;
}
