import { createReducer, on } from '@ngrx/store';
import { DemandsState, initialState } from './demands.state';
import {
  getBeneficiariesByFilterAction,
  getBeneficiariesByFilterFailureAction,
  getBeneficiariesByFilterSuccesAction,
  getRequestAction,
  getRequestFailureAction,
  getRequestsAction,
  getRequestsFailureAction,
  getRequestsSuccessAction,
  getRequestSuccessAction,
  saveRequestAction,
  saveRequestFailureAction,
  saveRequestSuccessAction,
  updateRequestAction,
  updateRequestFailureAction,
  updateRequestSuccessAction,
} from './demands.actions';

export const demandsReducer = createReducer<DemandsState>(
  initialState,
  on(getRequestsAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(getRequestsSuccessAction, (state, { payload, count }) => ({
    ...state,
    isLoading: false,
    data: payload,
    count,
  })),
  on(getRequestsFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(saveRequestAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(saveRequestSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    details: payload,
  })),
  on(saveRequestFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(getRequestAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(getRequestSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: null,
    details: payload,
  })),
  on(getRequestFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(updateRequestAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(updateRequestSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: null,
    details: payload,
  })),
  on(updateRequestFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(getBeneficiariesByFilterAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(getBeneficiariesByFilterSuccesAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    data: payload,
  })),
  on(getBeneficiariesByFilterFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
);
