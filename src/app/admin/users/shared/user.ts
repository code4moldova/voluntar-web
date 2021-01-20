import { UserRole } from './user-role';
import { WeekDay } from '@shared/week-day';

export interface User {
  _id?: string;
  created_at?: string;
  created_by: string;
  email: string;
  first_name: string;
  is_active: boolean;
  last_access: string;
  last_name: string;
  phone: number;
  logins: unknown[];
  /** @deprecated */
  role: UserRole[];
  roles: UserRole[];
  availability_days: WeekDay[];
  availability_hours_end: number;
  availability_hours_start: number;
}
