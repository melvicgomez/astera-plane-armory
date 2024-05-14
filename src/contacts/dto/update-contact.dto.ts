import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDetailDto, CreateContactDto } from './create-contact.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {}

export class UpdateContactDetailDto extends PartialType(
  CreateContactDetailDto,
) {}
