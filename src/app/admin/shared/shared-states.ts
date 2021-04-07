import { Demand } from '@demands/shared/demand';

export interface LoadableState<T> {
  count: number;
  isLoading: boolean;
  error: string | null;
  data: T[];
}

export interface BaseState<T> {
  data: T[];
  count: number;
  details: T | null;
  isLoading: boolean;
  error: string | null;
  demands: LoadableState<Demand>;
}

export const baseInitialState: BaseState<any> = {
  data: [],
  count: 0,
  details: null,
  isLoading: false,
  error: null,
  demands: {
    count: -1,
    isLoading: false,
    error: null,
    data: [],
  },
};
