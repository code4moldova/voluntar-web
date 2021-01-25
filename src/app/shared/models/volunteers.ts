import { VolunteerRole, Zone } from '@shared/constants';

export interface IVolunteer {
  _id?: string;
  activity_types: string[];
  address: string;
  age: number;
  availability: number;
  created_at: string;
  email: string;
  facebook_profile: string;
  first_name: string;
  is_active: boolean;
  last_name: string;
  latitude: number;
  longitude: number;
  phone: number;
  black_list: boolean;
  role: VolunteerRole[];
  zone: Zone;
  distance?: number;
  accepted_offer?: boolean;
  availability_days?: string[];
  telegram_chat_id?: string;
  count?: number;
}
