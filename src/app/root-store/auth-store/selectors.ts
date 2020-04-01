import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './state';
import { IUser } from '@models/user';

export const selectUser = createFeatureSelector<any, AuthState>('auth');

export const selectIsLoading = createSelector(
  selectUser,
  (state: AuthState): boolean => {
    return state.isLoading;
  }
);

export const selectAuthUserData = createSelector(
  selectUser,
  (state: AuthState): IUser => {
    return state.userData;
  }
);
