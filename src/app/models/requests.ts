export interface IRequest {
  _id?: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: number;
  is_active: true;
  address: string;
  zone_address: string;
  age: boolean;
  latitude: boolean;
  longitude: boolean;
  activity_types: string;
  have_money: true;
  comments: string;
  questions: string;
  status: string;
  secret: string;
  availability_volunteer: number;
  volunteer: string;
}

export interface IRequestDetails extends IRequest {
  created_at: string;
}

export const statusOptions = [
  {
      label: 'New',
      _id: 'new',
  },
  {
      label: 'Waiting',
      _id: 'waiting',
  },
  {
      label: 'Accepted',
      _id: 'accepted',
  },
  {
      label: 'On progress',
      _id: 'onprogress',
  },
  {
      label: 'Cancelled',
      _id: 'cancelled',
  },
  {
      label: 'Done',
      _id: 'done',
  },
]

// export interface IComment { }
