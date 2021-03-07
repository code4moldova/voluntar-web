import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DemandsState } from './demands.state';
import { Demand } from '@demands/shared/demand';
import { AppState } from '@app/app.state';

export const selectDemands = createFeatureSelector<AppState, DemandsState>(
  'demands',
);

export const selectIsLoading = createSelector(
  selectDemands,
  (state: DemandsState) => state.isLoading,
);

export const selectDemandsData = createSelector(
  selectDemands,
  (state: DemandsState) => state.data,
);
export const selectDemandsCount = createSelector(
  selectDemands,
  (state: DemandsState) => state.count,
);

export const selectDemandsError = createSelector(
  selectDemands,
  (state: DemandsState) => state.error,
);
export const selectDemandsDetails = createSelector(
  selectDemands,
  (state: DemandsState) => state.details,
);
