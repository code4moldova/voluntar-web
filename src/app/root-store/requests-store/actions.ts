import { Action, createAction, props } from '@ngrx/store';
import { IRequest } from '@models/requests';

export enum ActionTypes {
  GET_REQUESTS = '[Requests] Get Requests',
  GET_REQUESTS_SUCCESS = '[Requests] Get Requests Success',
  GET_REQUESTS_FAILURE = '[Requests] Get Requests Failure'
}

export const getRequestsAction = createAction(ActionTypes.GET_REQUESTS);
export const getRequestsFailureAction = createAction(
  ActionTypes.GET_REQUESTS_FAILURE,
  props<{ error: any }>()
);
export const getRequestsSuccessAction = createAction(
  ActionTypes.GET_REQUESTS_SUCCESS,
  props<{ payload: IRequest[] }>()
);
