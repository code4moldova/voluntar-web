import { createReducer, on, Action } from '@ngrx/store';

import { initialState, BeneficiariesState } from './state';
import {
  getBeneficiaryAction,
  getBeneficiarySuccessAction,
  getBeneficiaryFailureAction,
  saveBeneficiaryAction,
  saveBeneficiarySuccessAction,
  saveBeneficiaryFailureAction,
  updateBeneficiaryAction,
  updateBeneficiarySuccessAction,
  updateBeneficiaryFailureAction,
  getBeneficiariesAction,
  getBeneficiariesSuccessAction,
  getBeneficiariesFailureAction,
  getBeneficiariesByFilterAction,
  getBeneficiariesByFilterSuccessAction,
  getBeneficiariesByFilterFailureAction
} from './actions';

const beneficiaryReducer = createReducer(
  initialState,
  on(getBeneficiariesAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(getBeneficiariesSuccessAction, (state, { payload, count }) => ({
    ...state,
    isLoading: false,
    data: payload,
    count,
  })),
  on(getBeneficiariesFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(saveBeneficiaryAction, (state, Beneficiary) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(saveBeneficiarySuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    details: payload,
  })),
  on(saveBeneficiaryFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(updateBeneficiaryAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(updateBeneficiarySuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    details: payload,
  })),
  on(updateBeneficiaryFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(getBeneficiaryAction, (state) => ({
    ...state,
    details: null,
    isLoading: true,
  })),
  on(getBeneficiarySuccessAction, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      details: payload,
      error: null,
    };
  }),
  on(getBeneficiaryFailureAction, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  }),
  on(getBeneficiariesByFilterAction, (state) => ({
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
  }))
);

export function reducer(state: BeneficiariesState | undefined, action: Action) {
  return beneficiaryReducer(state, action);
}
