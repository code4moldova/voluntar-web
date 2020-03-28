import { Volunteer } from '@models/volunteer';
import { IVolunteer } from '@models/volunteers';

export interface VolunteersState {
  data: IVolunteer[];
  details: IVolunteer;
  isLoading: boolean;
  error: string;
}

export const initialState: VolunteersState = {
  data: [],
  details: null,
  isLoading: false,
  error: null
};
