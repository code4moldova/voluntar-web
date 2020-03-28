export interface IRequest {
  id: number;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  geo: number;
  date: string;
  status: boolean;
  phone: string;
  apartment_nr: string;
  request: string;
  has_money: boolean;
  curator: boolean;
  comments?: Comment[];
}

export interface Comment {}
