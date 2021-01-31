import { IRequest } from '@shared/models';

export interface DemandsState {
  data: IRequest[];
  count: number;
  details: IRequest;
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
