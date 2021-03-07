import { Demand } from '@demands/shared/demand';

export interface DemandsState {
  data: Demand[];
  count: number | null;
  details: Demand | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: DemandsState = {
  data: [],
  count: null,
  details: null,
  isLoading: false,
  error: null,
};
