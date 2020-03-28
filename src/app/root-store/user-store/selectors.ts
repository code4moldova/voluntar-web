import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './state';

export const selectUser = createFeatureSelector<any, UserState>('user');

export const selectIsLoading = createSelector(
  selectUser,
  (state: UserState): boolean => {
    return state.isLoading;
  }
);
