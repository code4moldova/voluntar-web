import { Beneficiary } from '@beneficiaries/shared/beneficiary';
import { Demand } from '@demands/shared/demand';

export interface LoadableState<T> {
  count: number;
  isLoading: boolean;
  error: string | null;
  data: T[];
}

export interface BeneficiariesState {
  data: Beneficiary[];
  count: number;
  details: Beneficiary | null;
  isLoading: boolean;
  error: string | null;
  demands: LoadableState<Demand>;
  blockList: LoadableState<Beneficiary>;
}

export const initialState: BeneficiariesState = {
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
  blockList: {
    count: -1,
    isLoading: false,
    error: null,
    data: [],
  },
};
