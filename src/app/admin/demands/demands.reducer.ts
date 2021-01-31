import { createReducer, on } from '@ngrx/store';
import { DemandsState, initialState } from './demands.state';
import {
  getBeneficiariesByFilterFailureAction,
  getBeneficiariesByFilterRequestAction,
  getBeneficiariesByFilterSuccessAction,
  getDemandFailureAction,
  getDemandRequestAction,
  getDemandsFailureAction,
  getDemandsRequestAction,
  getDemandsSuccessAction,
  getDemandSuccessAction,
  saveDemandFailureAction,
  saveDemandRequestAction,
  saveDemandSuccessAction,
  updateDemandFailureAction,
  updateDemandRequestAction,
  updateDemandSuccessAction,
} from './demands.actions';

export const demandsReducer = createReducer<DemandsState>(
  initialState,
  on(getDemandsRequestAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(getDemandsSuccessAction, (state, { payload, count }) => ({
    ...state,
    isLoading: false,
    data: payload,
    count,
  })),
  on(getDemandsFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(saveDemandRequestAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(saveDemandSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    details: payload,
  })),
  on(saveDemandFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(getDemandRequestAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(getDemandSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: null,
    details: payload,
  })),
  on(getDemandFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(updateDemandRequestAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(updateDemandSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: null,
    details: payload,
  })),
  on(updateDemandFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(getBeneficiariesByFilterRequestAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(getBeneficiariesByFilterSuccessAction, (state, { payload }) => ({
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
