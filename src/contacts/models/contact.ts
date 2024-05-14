export enum ContactType {
  EMAIL = 'Email',
  LANDLINE = 'Landline',
  MOBILE = 'Mobile',
}

export interface UserContactDetail {
  id: number;
  type: ContactType;
  value: string;
}
