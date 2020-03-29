import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RequestsState } from './state';
import { IRequest } from '@models/requests';

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

export const selectRequestsError = createSelector(selectRequests, (state: RequestsState) => state.error);
export const selectRequestsDetails = createSelector(selectRequests, (state: RequestsState) => state.details);
