import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
import { User } from '@users/shared/user';

export const selectUser = createFeatureSelector<any, AuthState>('auth');

export const selectIsLoading = createSelector(
  selectUser,
  (state: AuthState): boolean => {
    return state.isLoading;
  }
);

export const selectAuthUserData = createSelector(
  selectUser,
  (state: AuthState): User => {
    return state.userData;
  }
);
