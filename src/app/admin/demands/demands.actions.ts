import { createAction, props } from '@ngrx/store';
import { Demand } from '@demands/shared/demand';

export enum ActionTypes {
  GET_DEMANDS_REQUEST = '[Demands] Get Demands Request',
  GET_DEMANDS_SUCCESS = '[Demands] Get Demands Success',
  GET_DEMANDS_FAILURE = '[Demands] Get Demands Failure',

  GET_DEMAND_REQUEST = '[Demand] Get Demand Request',
  GET_DEMAND_SUCCESS = '[Demand] Get Demand Success',
  GET_DEMAND_FAILURE = '[Demand] Get Demand Failure',

  SAVE_DEMAND_REQUEST = '[Demand] Save Demand Request',
  SAVE_DEMAND_SUCCESS = '[Demand] Save Demand Success',
  SAVE_DEMAND_FAILURE = '[Demand] Save Demand Failure',

  UPDATE_DEMAND_REQUEST = '[Demand] Update Demand Request',
  UPDATE_DEMAND_SUCCESS = '[Demand] Update Demand Success',
  UPDATE_DEMAND_FAILURE = '[Demand] Update Demand Failure',

  GET_BENEFICIARIES_BY_FILTER_REQUEST = '[Demand] Get Demand By Filter Request',
  GET_BENEFICIARIES_BY_FILTER_FAILURE = '[Demand] Get Demand By Filter Failure',
  GET_BENEFICIARIES_BY_FILTER_SUCCESS = '[Demand] Get Demand By Filter Success',
}

export const getDemandsRequestAction = createAction(
  ActionTypes.GET_DEMANDS_REQUEST,
  props<{ page: { pageSize: number; pageIndex: number }; filters?: any }>(),
);
export const getDemandsFailureAction = createAction(
  ActionTypes.GET_DEMANDS_FAILURE,
  props<{ error: any }>(),
);
export const getDemandsSuccessAction = createAction(
  ActionTypes.GET_DEMANDS_SUCCESS,
  props<{ payload: Demand[]; count: number }>(),
);

export const getDemandRequestAction = createAction(
  ActionTypes.GET_DEMAND_REQUEST,
  props<{ id: string }>(),
);
export const getDemandFailureAction = createAction(
  ActionTypes.GET_DEMAND_FAILURE,
  props<{ error: any }>(),
);
export const getDemandSuccessAction = createAction(
  ActionTypes.GET_DEMAND_SUCCESS,
  props<{ payload: Demand }>(),
);

export const saveDemandRequestAction = createAction(
  ActionTypes.SAVE_DEMAND_REQUEST,
  props<{ payload: Demand }>(),
);
export const saveDemandFailureAction = createAction(
  ActionTypes.SAVE_DEMAND_FAILURE,
  props<{ error: any }>(),
);
export const saveDemandSuccessAction = createAction(
  ActionTypes.SAVE_DEMAND_SUCCESS,
  props<{ payload: Demand }>(),
);

export const updateDemandRequestAction = createAction(
  ActionTypes.UPDATE_DEMAND_REQUEST,
  props<{ payload: Demand }>(),
);
export const updateDemandFailureAction = createAction(
  ActionTypes.UPDATE_DEMAND_FAILURE,
  props<{ error: any }>(),
);
export const updateDemandSuccessAction = createAction(
  ActionTypes.UPDATE_DEMAND_SUCCESS,
  props<{ payload: Demand }>(),
);

export const getBeneficiariesByFilterRequestAction = createAction(
  ActionTypes.GET_BENEFICIARIES_BY_FILTER_REQUEST,
  props<{ payload: { [keys: string]: string } }>(),
);

export const getBeneficiariesByFilterSuccessAction = createAction(
  ActionTypes.GET_BENEFICIARIES_BY_FILTER_SUCCESS,
  props<{ payload: Demand[] }>(),
);

export const getBeneficiariesByFilterFailureAction = createAction(
  ActionTypes.GET_BENEFICIARIES_BY_FILTER_FAILURE,
  props<{ error: any }>(),
);
