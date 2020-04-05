export interface IRequest {
  _id?: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: number;
  is_active: true;
  address: string;
  zone_address: string;
  age: boolean;
  latitude: boolean;
  longitude: boolean;
  activity_types: string;
  have_money: true;
  comments: string;
  questions: string;
  status: string;
  secret: string;
  availability_volunteer: number;
  volunteer: string;
}

export interface IRequestDetails extends IRequest {
  created_at: string;
}

export enum BeneficiaryField {
  None = '',
  Status = 'status',
  Phone = 'phone',
  Name = 'first_name',
  Fixer = 'fixer',
  'Zone Address' = 'zone_address',
}

export interface BeneficiaryCriteriaFilter {
  field: BeneficiaryField;
  value: string;
}


// export interface IComment { }
