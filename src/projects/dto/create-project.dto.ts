import {
  BuildingAccreditation,
  ProjectGrade,
  ProjectProximity,
  ProjectType,
  TelcoProviders,
} from 'src/models/project';

export class CreateProjectDto {
  // Address
  street_name_1: string;
  street_name_2: string;
  barangay: string;
  city: string;
  province: string;
  region: string;
  postal_code: number;

  project_name: string;
  project_type: ProjectType;
  proximities: ProjectProximity[];
  class_type: ProjectGrade;
  accreditation: BuildingAccreditation;
  telco_providers: TelcoProviders[];
  property_features: string[];
  back_ups: string[];

  year_built: number;
  floor_count: number;
  elevator_count: number;

  // Pipe check that min is higher than max
  // min_lot_area: number;
  // max_lot_area: number;
  // min_cusa: number;
  // max_cusa: number;
  // min_rental_rate: number;
  // max_rental_rate: number;
  // min_leasable_area: number;
  // max_leasable_area: number;

  //
  longitude: number;
  latitude: number;

  // SEO
  slug: string;
  description: string;
  short_description: string;
  tags: string[];
}
