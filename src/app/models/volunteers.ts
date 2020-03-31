export interface IVolunteer {
  _id?: string;
  activity_types: string;
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
  zone_address: string;
}

export interface V2 {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: number;
  is_active: boolean;
  address: string;
  zone_address: string;
  facebook_profile: string;
  age: number;
  availability: number;
  telegram_id: string;
  latitude: number;
  longitude: number;
  activity_types: string;
}
