import { createReducer, on, Action } from '@ngrx/store';
import { initialState, RequestsState } from './state';
import {
  getRequestsAction,
  getRequestsSuccessAction,
  getRequestsFailureAction,
  getRequestAction,
  getRequestSuccessAction,
  getRequestFailureAction,
  saveRequestAction,
  saveRequestSuccessAction,
  saveRequestFailureAction,
  updateRequestAction,
  updateRequestSuccessAction,
  updateRequestFailureAction
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
  })),

  on(saveRequestAction, (state, volunteer) => ({
    ...state,
    error: null,
    isLoading: true
  })),
  on(saveRequestSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    details: payload
  })),
  on(saveRequestFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(getRequestAction, state => ({
    ...state,
    error: null,
    isLoading: true
  })),
  on(getRequestSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: null,
    details: payload
  })),
  on(getRequestFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(updateRequestAction, state => ({
    ...state,
    error: null,
    isLoading: true
  })),
  on(updateRequestSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: null,
    details: payload
  })),
  on(updateRequestFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  }))
);

export function reducer(state: RequestsState | undefined, action: Action) {
  return volunteerReducer(state, action);
}
