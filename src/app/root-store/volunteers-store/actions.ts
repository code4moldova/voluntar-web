import { Action, createAction, props } from '@ngrx/store';

export enum ActionTypes {
  GET_VOLUNTEERS = '[Volunteers] Get Volunteers',
  GET_VOLUNTEERS_SUCCESS = '[Volunteers] Get Volunteers Success',
  GET_VOLUNTEERS_FAILURE = '[Volunteers] Get Volunteers Failure'
}

export const getVolunteersAction = createAction(
  ActionTypes.GET_VOLUNTEERS,
  props<{ payload: any }>()
);
export const getVolunteersFailureAction = createAction(
  ActionTypes.GET_VOLUNTEERS_FAILURE,
  props<{ error: any }>()
);
export const getVolunteersSuccessAction = createAction(
  ActionTypes.GET_VOLUNTEERS_SUCCESS,
  props<{ payload: any }>()
);
