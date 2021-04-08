import { Beneficiary } from '@beneficiaries/shared/beneficiary';
import {
  baseInitialState,
  BaseState,
  LoadableState,
} from '@app/admin/shared/shared-states';

export interface BeneficiariesState extends BaseState<Beneficiary> {
  blockList: LoadableState<Beneficiary>;
}

export const initialState: BeneficiariesState = {
  ...baseInitialState,
  blockList: {
    count: -1,
    isLoading: false,
    error: null,
    data: [],
  },
};
