import { Demand } from '@demands/shared/demand';

export interface DemandsState {
  data: Demand[];
  count: number;
  details: Demand;
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
