import { IRequestDetails } from '@models/requests';

export interface RequestsState {
  data: IRequestDetails[];
  details: IRequestDetails;
  isLoading: boolean;
  error: string;
}

export const initialState: RequestsState = {
  data: [],
  details: null,
  isLoading: false,
  error: null
};
