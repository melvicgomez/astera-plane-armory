import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContactDetail } from 'src/contacts/entities/contact_detail.entity';
import { Company } from 'src/companies/entities/company.entity';

@Entity({ name: 't_contact_persons' })
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  contact_person_id: string;

  @Column()
  company_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  position: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @OneToMany(() => ContactDetail, (contactDetail) => contactDetail.contact, {
    cascade: true,
  })
  contact_details: ContactDetail[];

  @ManyToOne(() => Company, (contact) => contact.contact_persons)
  @JoinColumn({
    name: 'company_id',
  })
  company: Company;
}
