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

  //
  longitude: number;
  latitude: number;

  // SEO
  slug: string;
  description: string;
  short_description: string;
  tags: string[];
}
