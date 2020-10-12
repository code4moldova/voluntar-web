import { Beneficiary } from '@models/beneficiary';

interface Volunteer {
  _id: string;
  first_name: string;
  last_name: string;
}

export interface BeneficiaryRequest {
  _id: string;
  type: string;
  number: number;
  status: string;
  urgent: boolean;
  comments: string;
  has_symptoms: boolean;
  created_at: string | Date;
  volunteer?: Volunteer;
}

export interface BeneficiaryRequestsState {
  count: number;
  isLoading: boolean;
  error: string;
  data: BeneficiaryRequest[];
}

export interface BeneficiariesState {
  data: Beneficiary[];
  count: number;
  details: Beneficiary;
  isLoading: boolean;
  error: string;
  requests: BeneficiaryRequestsState;
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
};
