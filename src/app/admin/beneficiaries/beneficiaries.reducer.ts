import { createReducer, on, Action } from '@ngrx/store';

import { initialState, BeneficiariesState } from './beneficiaries.state';
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
  getBeneficiariesByFilterFailureAction,
  getBeneficiaryDemandsAction,
  getBeneficiaryDemandsSuccessAction,
  getBeneficiaryDemandsFailureAction,
  getBeneficiaryBlockListAction,
  getBeneficiaryBlockListSuccessAction,
  getBeneficiaryBlockListFailureAction,
} from './beneficiaries.actions';

export const beneficiariesReducer = createReducer<BeneficiariesState>(
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

  on(saveBeneficiaryAction, (state) => ({
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
  })),
  // Beneficiary demands history
  on(getBeneficiaryDemandsAction, (state) => ({
    ...state,
    demands: { ...state.demands, isLoading: true, error: null },
  })),
  on(getBeneficiaryDemandsSuccessAction, (state, { payload, count }) => ({
    ...state,
    demands: { ...state.demands, isLoading: false, data: payload, count },
  })),
  on(getBeneficiaryDemandsFailureAction, (state, { error }) => ({
    ...state,
    demands: { ...state.demands, isLoading: false, error },
  })),

  // Block list
  on(getBeneficiaryBlockListAction, (state) => ({
    ...state,
    blockList: { ...state.blockList, isLoading: true, error: null },
  })),
  on(getBeneficiaryBlockListSuccessAction, (state, { payload, count }) => ({
    ...state,
    blockList: { ...state.blockList, isLoading: false, data: payload, count },
  })),
  on(getBeneficiaryBlockListFailureAction, (state, { error }) => ({
    ...state,
    blockList: { ...state.blockList, isLoading: false, error },
  })),
);
