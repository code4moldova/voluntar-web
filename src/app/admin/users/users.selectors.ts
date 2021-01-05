import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './shared/users.state';
import { User } from './shared/user';

const selectUsers = createFeatureSelector<any, UsersState>('users');

export const selectIsLoading = createSelector(
  selectUsers,
  (state: UsersState): boolean => {
    return state.isLoading;
  }
);

export const selectUserDetails = createSelector(
  selectUsers,
  (state: UsersState): User => {
    return state.userDetails;
  }
);

export const selectUsersList = createSelector(
  selectUsers,
  (state: UsersState): User[] => {
    return state.data;
  }
);
