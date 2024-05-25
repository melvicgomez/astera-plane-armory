import { ContactType, UserContactDetail } from 'src/models/contact';

export class CreateContactDto {
  company_id: number;
  first_name: string;
  last_name: string;
  position: string;
  contact_details: Omit<UserContactDetail, 'id'>[];
}

export class CreateContactDetailDto {
  type: ContactType;
  value: string;
}
