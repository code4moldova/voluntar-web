import { Action, createAction, props } from '@ngrx/store';
import { IRequest, IRequestDetails, BeneficiaryCriteriaFilter } from '@models/requests';

export enum ActionTypes {
  GET_REQUESTS = '[Requests] Get Requests',
  GET_REQUESTS_SUCCESS = '[Requests] Get Requests Success',
  GET_REQUESTS_FAILURE = '[Requests] Get Requests Failure',

  GET_REQUEST = '[Request] Get Request',
  GET_REQUEST_SUCCESS = '[Request] Get Request Success',
  GET_REQUEST_FAILURE = '[Request] Get Request Failure',

  GET_Beneficiares_BY_FILTER = '[Request] Get Request By Filter',
  GET_Beneficiares_BY_FILTER_SUCCES = '[Request] Get Request By Filter Succes',
  GET_Beneficiares_BY_FILTER_FAILURE = '[Request] Get Request By Filter Failure',


  SAVE_REQUEST = '[Request] Save Request',
  SAVE_REQUEST_SUCCESS = '[Request] Save Request Success',
  SAVE_REQUEST_FAILURE = '[Request] Save Request Failure',

  UPDATE_REQUEST = '[Request] Update Request',
  UPDATE_REQUEST_SUCCESS = '[Request] Update Request Success',
  UPDATE_REQUEST_FAILURE = '[Request] Update Request Failure',

  GET_ZONES = '[Request] Get Zones',
  GET_ZONES_SUCCESS = '[Request] Get Zones Success',
  GET_ZONES_FAILURE = '[Request] Get Zones Failure',
}

export const getRequestsAction = createAction(ActionTypes.GET_REQUESTS);
export const getRequestsFailureAction = createAction(
  ActionTypes.GET_REQUESTS_FAILURE,
  props<{ error: any }>()
);
export const getRequestsSuccessAction = createAction(
  ActionTypes.GET_REQUESTS_SUCCESS,
  props<{ payload: IRequestDetails[]; count: number }>()
);

export const getRequestAction = createAction(
  ActionTypes.GET_REQUEST,
  props<{ id: string }>()
);
export const getRequestFailureAction = createAction(
  ActionTypes.GET_REQUEST_FAILURE,
  props<{ error: any }>()
);
export const getRequestSuccessAction = createAction(
  ActionTypes.GET_REQUEST_SUCCESS,
  props<{ payload: IRequestDetails }>()
);

export const saveRequestAction = createAction(
  ActionTypes.SAVE_REQUEST,
  props<{ payload: IRequest }>()
);
export const saveRequestFailureAction = createAction(
  ActionTypes.SAVE_REQUEST_FAILURE,
  props<{ error: any }>()
);
export const saveRequestSuccessAction = createAction(
  ActionTypes.SAVE_REQUEST_SUCCESS,
  props<{ payload: IRequestDetails }>()
);

export const updateRequestAction = createAction(
  ActionTypes.UPDATE_REQUEST,
  props<{ payload: IRequestDetails }>()
);
export const updateRequestFailureAction = createAction(
  ActionTypes.UPDATE_REQUEST_FAILURE,
  props<{ error: any }>()
);
export const updateRequestSuccessAction = createAction(
  ActionTypes.UPDATE_REQUEST_SUCCESS,
  props<{ payload: IRequestDetails }>()
);

export const getZonesAction = createAction(ActionTypes.GET_ZONES);
export const getZonesSuccessAction = createAction(
  ActionTypes.GET_ZONES_SUCCESS,
  props<{ zones: any[] }>()
);
export const getZonesFailureAction = createAction(
  ActionTypes.GET_ZONES_FAILURE,
  props<{ error: any }>()
);

export const getBeneficiariesByFilterAction = createAction(
  ActionTypes.GET_Beneficiares_BY_FILTER,
  props<{ payload: BeneficiaryCriteriaFilter }>()
);

export const getBeneficiariesByFilterSuccesAction = createAction(
  ActionTypes.GET_Beneficiares_BY_FILTER_FAILURE,
  props<{ payload: IRequestDetails[] }>()
);

export const getBeneficiariesByFilterFailureAction = createAction(
  ActionTypes.GET_Beneficiares_BY_FILTER_FAILURE,
  props<{ error: any }>()
);
