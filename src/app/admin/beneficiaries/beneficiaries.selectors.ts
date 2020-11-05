import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  BeneficiariesState,
  BeneficiaryRequest,
  LoadableState,
} from './beneficiaries.state';
import { Beneficiary } from '@shared/models';

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
  (state: LoadableState<BeneficiaryRequest>): any => {
    return state.error;
  }
);

export const selectRequestsData = createSelector(
  selectRequests,
  (state: LoadableState<BeneficiaryRequest>): BeneficiaryRequest[] => {
    return state.data;
  }
);

export const selectRequestsCount = createSelector(
  selectRequests,
  (state: LoadableState<BeneficiaryRequest>): number => {
    return state.count;
  }
);

export const selectBlockList = createSelector(
  selectBeneficiaries,
  (state: BeneficiariesState): any => {
    return state.blockList;
  }
);

export const selectBlockListError = createSelector(
  selectBlockList,
  (state: LoadableState<Beneficiary>): any => {
    return state.error;
  }
);

export const selectBlockListData = createSelector(
  selectBlockList,
  (state: LoadableState<Beneficiary>): Beneficiary[] => {
    return state.data;
  }
);

export const selectBlockListCount = createSelector(
  selectBlockList,
  (state: LoadableState<Beneficiary>): number => {
    return state.count;
  }
);

export const selectBlockListIsLoading = createSelector(
  selectBlockList,
  (state: LoadableState<Beneficiary>): boolean => {
    return state.isLoading;
  }
);
