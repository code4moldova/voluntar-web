import { createAction, props } from '@ngrx/store';

import { Beneficiary } from '@models/beneficiary';
import { BeneficiaryRequest } from './beneficiaries.state';

export enum ActionTypes {
  GET_BENEFICIARIES = '[Beneficiaries] Get Beneficiaries',
  GET_BENEFICIARIES_SUCCESS = '[Beneficiaries] Get Beneficiaries Success',
  GET_BENEFICIARIES_FAILURE = '[Beneficiaries] Get Beneficiaries Failure',

  GET_BENEFICIARY = '[Beneficiary] Get Beneficiary',
  GET_BENEFICIARY_SUCCESS = '[Beneficiary] Get Beneficiary Success',
  GET_BENEFICIARY_FAILURE = '[Beneficiary] Get Beneficiary Failure',

  GET_BENEFICIARY_REQUESTS = '[Beneficiary] Get Beneficiary Requests',
  GET_BENEFICIARY_REQUESTS_SUCCESS = '[Beneficiary] Get Beneficiary Requests Success',
  GET_BENEFICIARY_REQUESTS_FAILURE = '[Beneficiary] Get Beneficiary Requests Failure',

  GET_BENEFICIARY_BLOCK_LIST = '[Beneficiary] Get Beneficiary Block List',
  GET_BENEFICIARY_BLOCK_LIST_SUCCESS = '[Beneficiary] Get Beneficiary Block List Success',
  GET_BENEFICIARY_BLOCK_LIST_FAILURE = '[Beneficiary] Get Beneficiary Block List Failure',

  GET_BENEFICIARIES_BY_FILTER = '[Beneficiaries] Get Beneficiaries By Filter',
  GET_BENEFICIARIES_BY_FILTER_SUCCES = '[Beneficiaries] Get Beneficiaries By Filter Success',
  GET_BENEFICIARIES_BY_FILTER_FAILURE = '[Beneficiaries] Get Beneficiaries By Filter Failure',

  SAVE_BENEFICIARY = '[Beneficiary] Save Beneficiary',
  SAVE_BENEFICIARY_SUCCESS = '[Beneficiary] Save Beneficiary Success',
  SAVE_BENEFICIARY_FAILURE = '[Beneficiary] Save Beneficiary Failure',

  UPDATE_BENEFICIARY = '[Beneficiary] Update Beneficiary',
  UPDATE_BENEFICIARY_SUCCESS = '[Beneficiary] Update Beneficiary Success',
  UPDATE_BENEFICIARY_FAILURE = '[Beneficiary] Update Beneficiary Failure',
}

export const getBeneficiariesAction = createAction(
  ActionTypes.GET_BENEFICIARIES,
  props<{ page: { pageSize: number; pageIndex: number }; filters?: any }>()
);
export const getBeneficiariesFailureAction = createAction(
  ActionTypes.GET_BENEFICIARIES_FAILURE,
  props<{ error: any }>()
);
export const getBeneficiariesSuccessAction = createAction(
  ActionTypes.GET_BENEFICIARIES_SUCCESS,
  props<{ payload: Beneficiary[]; count: number }>()
);

export const getBeneficiaryAction = createAction(
  ActionTypes.GET_BENEFICIARY,
  props<{ id: string }>()
);
export const getBeneficiarySuccessAction = createAction(
  ActionTypes.GET_BENEFICIARY_SUCCESS,
  props<{ payload: Beneficiary }>()
);
export const getBeneficiaryFailureAction = createAction(
  ActionTypes.GET_BENEFICIARY_FAILURE,
  props<{ error: any }>()
);

export const getBeneficiaryRequestsAction = createAction(
  ActionTypes.GET_BENEFICIARY_REQUESTS,
  props<{ id: string; page: { pageSize: number; pageIndex: number } }>()
);

export const getBeneficiaryRequestsSuccessAction = createAction(
  ActionTypes.GET_BENEFICIARY_REQUESTS_SUCCESS,
  props<{ payload: BeneficiaryRequest[]; count: number }>()
);

export const getBeneficiaryRequestsFailureAction = createAction(
  ActionTypes.GET_BENEFICIARY_REQUESTS_FAILURE,
  props<{ error: any }>()
);

export const saveBeneficiaryAction = createAction(
  ActionTypes.SAVE_BENEFICIARY,
  props<{ payload: Beneficiary }>()
);
export const saveBeneficiaryFailureAction = createAction(
  ActionTypes.SAVE_BENEFICIARY_FAILURE,
  props<{ error: any }>()
);
export const saveBeneficiarySuccessAction = createAction(
  ActionTypes.SAVE_BENEFICIARY_SUCCESS,
  props<{ payload: any }>()
);

export const updateBeneficiaryAction = createAction(
  ActionTypes.UPDATE_BENEFICIARY,
  props<{ payload: Beneficiary }>()
);
export const updateBeneficiaryFailureAction = createAction(
  ActionTypes.UPDATE_BENEFICIARY_FAILURE,
  props<{ error: any }>()
);
export const updateBeneficiarySuccessAction = createAction(
  ActionTypes.UPDATE_BENEFICIARY_SUCCESS,
  props<{ payload: any }>()
);

export const getBeneficiariesByFilterAction = createAction(
  ActionTypes.GET_BENEFICIARIES_BY_FILTER,
  props<{ payload: { [keys: string]: string } }>()
);

export const getBeneficiariesByFilterSuccessAction = createAction(
  ActionTypes.GET_BENEFICIARIES_BY_FILTER_SUCCES,
  props<{ payload: Beneficiary[] }>()
);

export const getBeneficiariesByFilterFailureAction = createAction(
  ActionTypes.GET_BENEFICIARIES_BY_FILTER_FAILURE,
  props<{ error: any }>()
);

export const getBeneficiaryBlockListAction = createAction(
  ActionTypes.GET_BENEFICIARY_BLOCK_LIST,
  props<{
    page: { pageSize: number; pageIndex: number };
    filters: Record<string, string>;
  }>()
);

export const getBeneficiaryBlockListSuccessAction = createAction(
  ActionTypes.GET_BENEFICIARY_BLOCK_LIST_SUCCESS,
  props<{ payload: Beneficiary[]; count: number }>()
);

export const getBeneficiaryBlockListFailureAction = createAction(
  ActionTypes.GET_BENEFICIARY_BLOCK_LIST_FAILURE,
  props<{ error: any }>()
);
