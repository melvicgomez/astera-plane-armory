export class CreatePropertyDto {
  project_id: string;
  property_name: string;
  perferred_tenants: string[];
  end_of_contract: string;
  turnover_remarks: string[];
  telco_providers: string[];
  electricity_backup: string[];
  operating_hours: string;
  floor_level: number;
  aircon_operation: string;
  frontage_area: number;
  lot_area: number;
  min_lease_term: number;
  max_lease_term: number;
  cusa_rate: number;
  min_rental_rate: number;
  max_rental_rate: number;
  leasable_area: number;
  alfresco_area: number;
  alfresco_rental_rate: number;
  alfresco_cusa_rate: number;

  added_by: string;
}
