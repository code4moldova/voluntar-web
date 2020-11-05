import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RequestsState } from './requests.state';
import { IRequest } from '@shared/models';

export const selectRequests = createFeatureSelector<any, RequestsState>(
  'requests'
);

export const selectIsLoading = createSelector(
  selectRequests,
  (state: RequestsState): boolean => {
    return state.isLoading;
  }
);

export const selectRequestsData = createSelector(
  selectRequests,
  (state: RequestsState): IRequest[] => {
    return state.data;
  }
);
export const selectRequestsCount = createSelector(
  selectRequests,
  (state: RequestsState): number => {
    return state.count;
  }
);

export const selectRequestsError = createSelector(
  selectRequests,
  (state: RequestsState) => state.error
);
export const selectRequestsDetails = createSelector(
  selectRequests,
  (state: RequestsState) => state.details
);

export const selectZones = createSelector(
  selectRequests,
  (state: RequestsState): any => {
    return state.zones;
  }
);
