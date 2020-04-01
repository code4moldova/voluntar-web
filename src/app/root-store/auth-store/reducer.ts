import { createReducer, on, Action } from '@ngrx/store';
import { initialState, AuthState } from './state';
import { loginAction, loginSuccessAction, loginFailureAction } from './actions';

const customerReducer = createReducer(
  initialState,
  on(loginAction, state => ({
    ...state,
    error: null,
    isLoading: true
  })),
  on(loginSuccessAction, (state, { accessToken, refreshToken }) => ({
    ...state,
    isLoading: false,
    token: {
      accessToken,
      refreshToken
    }
  })),
  on(loginFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return customerReducer(state, action);
}
