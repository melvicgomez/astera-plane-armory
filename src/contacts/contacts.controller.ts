import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import {
  CreateContactDetailDto,
  CreateContactDto,
} from './dto/create-contact.dto';
import {
  UpdateContactDetailDto,
  UpdateContactDto,
} from './dto/update-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(id);
  }

  @Post('new-detail/:contact_person_id')
  createNewContactDetails(
    @Param('contact_person_id') contact_person_id: string,
    @Body() contactDetail: CreateContactDetailDto,
  ) {
    return this.contactsService.createContactDetailToContactByContactPersonId(
      contact_person_id,
      contactDetail,
    );
  }

  @Patch('update-detail/:id')
  updateContactDetailById(
    @Param('id') id: string,
    @Body() contactDetail: UpdateContactDetailDto,
  ) {
    return this.contactsService.updateContactDetailToContactById(
      id,
      contactDetail,
    );
  }

  @Delete('delete-detail/:id')
  removeContactDetailById(@Param('id') id: string) {
    return this.contactsService.removeContactDetailById(id);
  }
}
