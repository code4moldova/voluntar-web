import { SpecialCondition } from '@beneficiaries/shared/special-condition';

export interface Beneficiary {
  _id?: string;
  first_name: string;
  last_name: string;
  phone: string;
  landline: string;
  age: number;
  zone: string;
  address: string;
  entrance: string;
  floor: string;
  apartment: string;
  latitude: number;
  longitude: number;
  special_condition?: SpecialCondition;
  created_at: string | Date;
}
