import { Demand } from '@demands/shared/demand';

export interface IRequest extends Demand {
  email: string;
  first_name: string;
  last_name: string;
  phone: number;
  is_active: true;
  address: string;
  zone_address: string;
  zone: string;
  age: number;
  latitude: number;
  longitude: number;
  activity_types: string;
  have_money: true;
  fixer_comment: string;
  questions: string;
  availability_volunteer: number;

  is_urgent: boolean;
  offer: string;
  city: string;
  curator: boolean;
  has_disabilities: boolean;
  additional_info: string[];
  fixer: string;

  paying_by_card: boolean;
  warm_lunch: boolean;
  grocery: boolean;
  medicine: boolean;
  in_blacklist: boolean;
}
