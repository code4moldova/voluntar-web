import { Action, createReducer, on } from '@ngrx/store';
import { AuthState, initialState } from './auth.state';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from './auth.actions';

const customerReducer = createReducer(
  initialState,
  on(loginAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(loginSuccessAction, (state, { accessToken, refreshToken }) => ({
    ...state,
    isLoading: false,
    token: {
      accessToken,
      refreshToken,
    },
  })),
  on(loginFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return customerReducer(state, action);
}
