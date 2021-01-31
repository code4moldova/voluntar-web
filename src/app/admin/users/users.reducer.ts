import { Action, createReducer, on } from '@ngrx/store';
import { UsersState } from './shared/users.state';
import {
  createUserAction,
  createUserFailureAction,
  createUserSuccessAction,
  getUserDetailsAction,
  getUserDetailsFailureAction,
  getUserDetailsSuccessAction,
  getUsersAction,
  getUsersFailureAction,
  getUsersSuccessAction,
  updateUserAction,
  updateUserFailureAction,
  updateUserSuccessAction,
} from './users.actions';

export const usersReducer = createReducer<UsersState, Action>(
  {
    data: { list: [], count: 0 },
    userDetails: null,
    isLoading: false,
    error: null,
  },
  on(getUsersAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(getUsersSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    data: payload,
  })),
  on(getUsersFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(getUserDetailsAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(getUserDetailsSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    userDetails: payload,
  })),
  on(getUserDetailsFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(createUserAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(createUserSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    userDetails: payload,
  })),
  on(createUserFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(updateUserAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(updateUserSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    userDetails: payload,
  })),
  on(updateUserFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
);
