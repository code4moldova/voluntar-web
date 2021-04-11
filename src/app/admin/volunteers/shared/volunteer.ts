import { Zone } from '@shared/zone';
import {
  VolunteerRole,
  VolunteerStatus,
} from '@volunteers/shared/volunteer-enums';
import { WeekDay } from '@shared/week-day';

export interface Volunteer {
  _id?: string;
  cluster_id?: string;
  activity_types: string[];
  address: string;
  age: number;
  created_at: string;
  email: string;
  facebook_profile: string;
  first_name: string;
  last_name: string;
  latitude: number;
  longitude: number;
  phone: string;
  role: VolunteerRole[];
  status: VolunteerStatus;
  zone: Zone;
  distance?: number;
  accepted_offer?: boolean;
  availability_days?: WeekDay[];
  availability_hours_start?: number;
  availability_hours_end?: number;
  telegram_chat_id?: string;
  count?: number;
}
