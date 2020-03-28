import { createReducer, on, Action } from '@ngrx/store';
import { initialState, RequestsState } from './state';
import {
  getRequestsAction,
  getRequestsSuccessAction,
  getRequestsFailureAction
} from './actions';

const volunteerReducer = createReducer(
  initialState,
  on(getRequestsAction, state => ({
    ...state,
    error: null,
    isLoading: true
  })),
  on(getRequestsSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    data: payload
  })),
  on(getRequestsFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  }))
);

export function reducer(state: RequestsState | undefined, action: Action) {
  return volunteerReducer(state, action);
}
