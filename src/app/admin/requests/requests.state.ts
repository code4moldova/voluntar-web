import { IRequestDetails } from '@shared/models';

export interface RequestsState {
  data: IRequestDetails[];
  count: number;
  details: IRequestDetails;
  isLoading: boolean;
  error: string;
}

export const initialState: RequestsState = {
  data: [],
  count: null,
  details: null,
  isLoading: false,
  error: null,
};
