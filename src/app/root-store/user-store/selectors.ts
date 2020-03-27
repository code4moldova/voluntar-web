import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './state';

export const selectCatalog = createFeatureSelector<any, UserState>('user');

export const selectIsLoading = createSelector(
  selectCatalog,
  (state: UserState): boolean => {
    return state.isLoading;
  }
);
