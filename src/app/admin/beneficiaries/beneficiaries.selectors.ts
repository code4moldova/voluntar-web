import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BeneficiariesState, LoadableState } from './beneficiaries.state';
import { Beneficiary } from './shared/beneficiary';
import { Demand } from '@demands/shared/demand';

export const selectBeneficiaries = createFeatureSelector<
  any,
  BeneficiariesState
>('beneficiaries');

export const selectIsLoading = createSelector(
  selectBeneficiaries,
  (state: BeneficiariesState): boolean => {
    return state.isLoading;
  },
);

export const selectError = createSelector(
  selectBeneficiaries,
  (state: BeneficiariesState): any => {
    return state.error;
  },
);

export const selectBeneficiariesData = createSelector(
  selectBeneficiaries,
  (state: BeneficiariesState): Beneficiary[] => {
    return state.data;
  },
);

export const selectBeneficiariesCount = createSelector(
  selectBeneficiaries,
  (state: BeneficiariesState): number => {
    return state.count;
  },
);

export const selectBeneficiaryDetails = createSelector(
  selectBeneficiaries,
  (state: BeneficiariesState): Beneficiary => {
    return state.details;
  },
);

export const selectDemands = createSelector(
  selectBeneficiaries,
  (state: BeneficiariesState): any => {
    return state.demands;
  },
);

export const selectDemandsError = createSelector(
  selectDemands,
  (state: LoadableState<Demand>): any => {
    return state.error;
  },
);

export const selectDemandsData = createSelector(
  selectDemands,
  (state: LoadableState<Demand>): Demand[] => {
    return state.data;
  },
);

export const selectDemandsCount = createSelector(
  selectDemands,
  (state: LoadableState<Demand>): number => {
    return state.count;
  },
);

export const selectBlockList = createSelector(
  selectBeneficiaries,
  (state: BeneficiariesState): any => {
    return state.blockList;
  },
);

export const selectBlockListError = createSelector(
  selectBlockList,
  (state: LoadableState<Beneficiary>): any => {
    return state.error;
  },
);

export const selectBlockListData = createSelector(
  selectBlockList,
  (state: LoadableState<Beneficiary>): Beneficiary[] => {
    return state.data;
  },
);

export const selectBlockListCount = createSelector(
  selectBlockList,
  (state: LoadableState<Beneficiary>): number => {
    return state.count;
  },
);

export const selectBlockListIsLoading = createSelector(
  selectBlockList,
  (state: LoadableState<Beneficiary>): boolean => {
    return state.isLoading;
  },
);
