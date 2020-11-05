import { IVolunteer } from '@shared/models';

export interface VolunteersState {
  data: IVolunteer[];
  count: number;
  details: IVolunteer;
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
