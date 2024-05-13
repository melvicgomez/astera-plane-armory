export class CreateCompanyDto {
  company_name: string;
  logo_slug: string;

  region: string;
  province: string;
  city: string;
  postal_code: string;
  barangay: string;
  street_name_1: string;
  street_name_2?: string;
}
