import { Volunteer } from '@models/volunteer';
import { IRequest } from '@models/requests';

export interface RequestsState {
  data: IRequest[];
  details: IRequest;
  isLoading: boolean;
  error: string;
}

export const initialState: RequestsState = {
  data: [],
  details: null,
  isLoading: false,
  error: null
};
