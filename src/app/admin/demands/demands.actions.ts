import { createAction, props } from '@ngrx/store';
import { Demand } from '@demands/shared/demand';

export enum ActionTypes {
  GET_REQUESTS = '[Requests] Get Requests',
  GET_REQUESTS_SUCCESS = '[Requests] Get Requests Success',
  GET_REQUESTS_FAILURE = '[Requests] Get Requests Failure',

  GET_REQUEST = '[Request] Get Request',
  GET_REQUEST_SUCCESS = '[Request] Get Request Success',
  GET_REQUEST_FAILURE = '[Request] Get Request Failure',

  GET_Beneficiares_BY_FILTER = '[Request] Get Request By Filter',
  GET_Beneficiares_BY_FILTER_FAILURE = '[Request] Get Request By Filter Failure',

  SAVE_REQUEST = '[Request] Save Request',
  SAVE_REQUEST_SUCCESS = '[Request] Save Request Success',
  SAVE_REQUEST_FAILURE = '[Request] Save Request Failure',

  UPDATE_REQUEST = '[Request] Update Request',
  UPDATE_REQUEST_SUCCESS = '[Request] Update Request Success',
  UPDATE_REQUEST_FAILURE = '[Request] Update Request Failure',
}

export const getRequestsAction = createAction(
  ActionTypes.GET_REQUESTS,
  props<{ page: { pageSize: number; pageIndex: number }; filters?: any }>(),
);
export const getRequestsFailureAction = createAction(
  ActionTypes.GET_REQUESTS_FAILURE,
  props<{ error: any }>(),
);
export const getRequestsSuccessAction = createAction(
  ActionTypes.GET_REQUESTS_SUCCESS,
  props<{ payload: Demand[]; count: number }>(),
);

export const getRequestAction = createAction(
  ActionTypes.GET_REQUEST,
  props<{ id: string }>(),
);
export const getRequestFailureAction = createAction(
  ActionTypes.GET_REQUEST_FAILURE,
  props<{ error: any }>(),
);
export const getRequestSuccessAction = createAction(
  ActionTypes.GET_REQUEST_SUCCESS,
  props<{ payload: Demand }>(),
);

export const saveRequestAction = createAction(
  ActionTypes.SAVE_REQUEST,
  props<{ payload: Demand }>(),
);
export const saveRequestFailureAction = createAction(
  ActionTypes.SAVE_REQUEST_FAILURE,
  props<{ error: any }>(),
);
export const saveRequestSuccessAction = createAction(
  ActionTypes.SAVE_REQUEST_SUCCESS,
  props<{ payload: Demand }>(),
);

export const updateRequestAction = createAction(
  ActionTypes.UPDATE_REQUEST,
  props<{ payload: Demand }>(),
);
export const updateRequestFailureAction = createAction(
  ActionTypes.UPDATE_REQUEST_FAILURE,
  props<{ error: any }>(),
);
export const updateRequestSuccessAction = createAction(
  ActionTypes.UPDATE_REQUEST_SUCCESS,
  props<{ payload: Demand }>(),
);

export const getBeneficiariesByFilterAction = createAction(
  ActionTypes.GET_Beneficiares_BY_FILTER,
  props<{ payload: { [keys: string]: string } }>(),
);

export const getBeneficiariesByFilterSuccesAction = createAction(
  ActionTypes.GET_Beneficiares_BY_FILTER_FAILURE,
  props<{ payload: Demand[] }>(),
);

export const getBeneficiariesByFilterFailureAction = createAction(
  ActionTypes.GET_Beneficiares_BY_FILTER_FAILURE,
  props<{ error: any }>(),
);
