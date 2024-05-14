import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { ContactDetail } from './entities/contact_detail.entity';
import { Company } from 'src/companies/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, ContactDetail, Company])],
  controllers: [ContactsController],
  providers: [ContactsService],
  exports: [ContactsService, TypeOrmModule],
})
export class ContactsModule {}
