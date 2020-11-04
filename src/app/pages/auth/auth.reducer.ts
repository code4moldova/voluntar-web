import { createReducer, on, Action } from '@ngrx/store';
import { initialState, AuthState } from './auth.state';
import {
  loginAction,
  loginSuccessAction,
  loginFailureAction,
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
