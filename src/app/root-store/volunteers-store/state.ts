import { Volunteer } from '@models/volunteer';

export interface VolunteersState {
  data: Volunteer[];
  details: any;
  isLoading: boolean;
  error: string;
}

export const initialState: VolunteersState = {
  data: [],
  details: null,
  isLoading: false,
  error: null
};
