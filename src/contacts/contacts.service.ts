import { Injectable } from '@nestjs/common';
import {
  CreateContactDetailDto,
  CreateContactDto,
} from './dto/create-contact.dto';
import {
  UpdateContactDetailDto,
  UpdateContactDto,
} from './dto/update-contact.dto';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactDetail } from './entities/contact_detail.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
    @InjectRepository(ContactDetail)
    private contactDetailsRepository: Repository<ContactDetail>,
  ) {}

  async create(createContactDto: CreateContactDto) {
    const contactDetailsToSave = createContactDto.contact_details;
    const contact = this.contactsRepository.create(createContactDto);
    if (createContactDto.contact_details)
      contact.contact_details =
        this.contactDetailsRepository.create(contactDetailsToSave);

    return await this.contactsRepository.save(contact);
  }

  findAll() {
    return this.contactsRepository.find();
  }

  findOne(id: string) {
    return this.contactsRepository.findOne({
      where: {
        contact_person_id: id,
      },
      relations: ['contact_details'],
    });
  }

  update(id: string, updateContactDto: UpdateContactDto) {
    return this.contactsRepository.update(id, updateContactDto);
  }

  async remove(id: string) {
    const contact = await this.contactsRepository.findOne({
      where: {
        contact_person_id: id,
      },
      relations: ['contact_details'],
    });
    if (contact) {
      if (contact.contact_details)
        await this.contactDetailsRepository.remove(contact.contact_details);
      return await this.contactsRepository.remove(contact);
    }
  }

  createContactDetailToContactByContactPersonId(
    contact_person_id: string,
    createContactDetailDto: CreateContactDetailDto,
  ) {
    return this.contactDetailsRepository.save({
      contact_person_id,
      type: createContactDetailDto.type,
      value: createContactDetailDto.value,
    });
  }

  updateContactDetailToContactById(
    id: string,
    updateContactDetailDto: UpdateContactDetailDto,
  ) {
    return this.contactDetailsRepository.update(id, {
      type: updateContactDetailDto.type,
      value: updateContactDetailDto.value,
    });
  }

  removeContactDetailById(id: string) {
    return this.contactDetailsRepository.delete(id);
  }
}
