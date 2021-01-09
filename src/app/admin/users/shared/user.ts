import { UserRole } from './user-role';

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
  role: UserRole[];
}
