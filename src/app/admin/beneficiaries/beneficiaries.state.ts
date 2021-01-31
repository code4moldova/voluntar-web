import { DemandStatus } from '@demands/shared/demand-status';
import { Beneficiary } from '@beneficiaries/shared/beneficiary';
import { DemandType } from '@demands/shared/demand-type';

interface Volunteer {
  _id: string;
  first_name: string;
  last_name: string;
}

export interface BeneficiaryRequest {
  _id: string;
  type: DemandType;
  number: number;
  status: DemandStatus;
  urgent: boolean;
  comments: string;
  has_symptoms: boolean;
  created_at: string | Date;
  volunteer?: Volunteer;
}

export interface LoadableState<T> {
  count: number;
  isLoading: boolean;
  error: string;
  data: T[];
}

export interface BeneficiariesState {
  data: Beneficiary[];
  count: number;
  details: Beneficiary;
  isLoading: boolean;
  error: string;
  requests: LoadableState<BeneficiaryRequest>;
  blockList: LoadableState<Beneficiary>;
}

export const initialState: BeneficiariesState = {
  data: [],
  count: 0,
  details: null,
  isLoading: false,
  error: null,
  requests: {
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
