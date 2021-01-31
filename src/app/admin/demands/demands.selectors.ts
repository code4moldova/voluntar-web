import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DemandsState } from './demands.state';
import { Demand } from '@demands/shared/demand';

export const selectDemands = createFeatureSelector<any, DemandsState>(
  'demands',
);

export const selectIsLoading = createSelector(
  selectDemands,
  (state: DemandsState): boolean => {
    return state.isLoading;
  },
);

export const selectDemandsData = createSelector(
  selectDemands,
  (state: DemandsState): Demand[] => {
    return state.data;
  },
);
export const selectDemandsCount = createSelector(
  selectDemands,
  (state: DemandsState): number => {
    return state.count;
  },
);

export const selectDemandsError = createSelector(
  selectDemands,
  (state: DemandsState) => state.error,
);
export const selectDemandsDetails = createSelector(
  selectDemands,
  (state: DemandsState) => state.details,
);
