import { Volunteer } from './shared/volunteer';

export interface VolunteersState {
  data: Volunteer[];
  count: number;
  details: Volunteer;
  isLoading: boolean;
  error: string;
}

export const initialState: VolunteersState = {
  data: [],
  count: 0,
  details: null,
  isLoading: false,
  error: null,
};
