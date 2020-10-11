import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  BeneficiariesState,
  BeneficiaryRequest,
  BeneficiaryRequestsState,
} from './state';
import { Beneficiary } from '@models/beneficiary';

export const selectBeneficiaries = createFeatureSelector<
  any,
  BeneficiariesState
>('beneficiaries');

export const selectIsLoading = createSelector(
  selectBeneficiaries,
  (state: BeneficiariesState): boolean => {
    return state.isLoading;
  }
);

export const selectError = createSelector(
  selectBeneficiaries,
  (state: BeneficiariesState): any => {
    return state.error;
  }
);

export const selectBeneficiariesData = createSelector(
  selectBeneficiaries,
  (state: BeneficiariesState): Beneficiary[] => {
    return state.data;
  }
);

export const selectBeneficiariesCount = createSelector(
  selectBeneficiaries,
  (state: BeneficiariesState): number => {
    return state.count;
  }
);

export const selectBeneficiaryDetails = createSelector(
  selectBeneficiaries,
  (state: BeneficiariesState): Beneficiary => {
    return state.details;
  }
);

export const selectRequests = createSelector(
  selectBeneficiaries,
  (state: BeneficiariesState): any => {
    return state.requests;
  }
);

export const selectRequestsError = createSelector(
  selectRequests,
  (state: BeneficiaryRequestsState): any => {
    return state.error;
  }
);

export const selectRequestsData = createSelector(
  selectRequests,
  (state: BeneficiaryRequestsState): BeneficiaryRequest[] => {
    return state.data;
  }
);

export const selectRequestsCount = createSelector(
  selectRequests,
  (state: BeneficiaryRequestsState): number => {
    return state.count;
  }
);
