import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './state';
import { IUser } from '@models/user';

export const selectUsers = createFeatureSelector<any, UsersState>('users');

export const selectIsLoading = createSelector(
  selectUsers,
  (state: UsersState): boolean => {
    return state.isLoading;
  }
);

export const selectUserDetails = createSelector(
  selectUsers,
  (state: UsersState): IUser => {
    return state.userDetails;
  }
);

export const selectUsersList = createSelector(
  selectUsers,
  (state: UsersState): IUser[] => {
    return state.data;
  }
);
