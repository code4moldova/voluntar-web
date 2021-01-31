import { IRequestDetails } from '@shared/models';

export interface DemandsState {
  data: IRequestDetails[];
  count: number;
  details: IRequestDetails;
  isLoading: boolean;
  error: string;
}

export const initialState: DemandsState = {
  data: [],
  count: null,
  details: null,
  isLoading: false,
  error: null,
};
