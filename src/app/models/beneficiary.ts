export interface Beneficiary {
  _id?: string;
  first_name: string;
  last_name: string;
  phone: string;
  landline: string;
  age: number;
  zone: string;
  address: string;
  special_condition: string;
  created_at: string | Date;
}
