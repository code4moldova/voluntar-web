export interface AuthCredentials {
  login: string;
  password: string;
}

export interface IUser {
  _id?: string;
  created_at?: string;
  created_by: string;
  email: string;
  first_name: string;
  is_active: boolean;
  last_access: string;
  last_name: string;
  phone: number;
  role: string[];
}
