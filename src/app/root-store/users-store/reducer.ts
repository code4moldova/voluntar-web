import { createReducer, on, Action } from '@ngrx/store';
import { initialState, UsersState } from './state';
import {
  getUsersAction,
  getUsersSuccessAction,
  getUsersFailureAction,
  getUserDetailsAction,
  getUserDetailsSuccessAction,
  getUserDetailsFailureAction,
  createUserAction,
  createUserSuccessAction,
  createUserFailureAction,
  updateUserAction,
  updateUserSuccessAction,
  updateUserFailureAction
} from './actions';

const customerReducer = createReducer(
  initialState,
  on(getUsersAction, state => ({
    ...state,
    error: null,
    isLoading: true
  })),
  on(getUsersSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    data: payload
  })),
  on(getUsersFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(getUserDetailsAction, state => ({
    ...state,
    error: null,
    isLoading: true
  })),
  on(getUserDetailsSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    userDetails: payload
  })),
  on(getUserDetailsFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(createUserAction, state => ({
    ...state,
    error: null,
    isLoading: true
  })),
  on(createUserSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    userDetails: payload
  })),
  on(createUserFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(updateUserAction, state => ({
    ...state,
    error: null,
    isLoading: true
  })),
  on(updateUserSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    userDetails: payload
  })),
  on(updateUserFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  }))
);

export function reducer(state: UsersState | undefined, action: Action) {
  return customerReducer(state, action);
}
