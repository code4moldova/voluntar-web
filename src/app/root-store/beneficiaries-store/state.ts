import { Beneficiary } from '@models/beneficiary';

export interface BeneficiariesState {
  data: Beneficiary[];
  count: number;
  details: Beneficiary;
  isLoading: boolean;
  error: string;
}

export const initialState: BeneficiariesState = {
  data: [],
  count: 0,
  details: null,
  isLoading: false,
  error: null,
};
