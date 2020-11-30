export type RequestStatus =
  | 'new'
  | 'confirmed'
  | 'in_process'
  | 'canceled'
  | 'solved'
  | 'archived';
export type RequestType = 'warm_lunch' | 'grocery' | 'medicine';

export interface IRequest {
  _id?: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: number;
  is_active: true;
  address: string;
  zone_address: string;
  age: number;
  latitude: boolean;
  longitude: boolean;
  activity_types: string;
  have_money: true;
  comments: string;
  fixer_comment: string;
  questions: string;
  status: RequestStatus;
  secret: string;
  availability_volunteer: number;
  volunteer: string;

  is_urgent: boolean;
  offer: string;
  city: string;
  has_symptoms: boolean;
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

export interface IRequestDetails extends IRequest {
  created_at: string;
}

// export interface IComment { }
