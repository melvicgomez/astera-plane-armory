export enum ProjectType {
  IndustrialLot = 'Industrial Lot',
  CommercialLot = 'Commercial Lot',
  IndustrialWarehouse = 'Industrial Warehouse',
  Retail = 'Retail',
  Office = 'Office',
}

export enum ProjectGrade {
  Premium = 'Premium',
  GradeA = 'Grade A',
  GradeB = 'Grade B',
  GradeC = 'Grade C',
}

export enum BuildingAccreditation {
  BERDE = 'BERDE',
  LEED = 'LEED',
  EDGE = 'EDGE',
  Others = 'Others',
}

export enum TelcoProviders {
  PLDT = 'PLDT',
  Globe = 'Globe',
  DITO = 'DITO',
  Converge = 'Converge',
  NOW = 'NOW',
  SkyCable = 'Sky Cable',
  Others = 'Others',
}

export interface ProjectProximity {
  location: string;
  distance: number;
}
