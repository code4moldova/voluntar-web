import { Action, createAction, props } from '@ngrx/store';
import { Volunteer } from '@models/volunteer';

export enum ActionTypes {
  GET_VOLUNTEERS = '[Volunteers] Get Volunteers',
  GET_VOLUNTEERS_SUCCESS = '[Volunteers] Get Volunteers Success',
  GET_VOLUNTEERS_FAILURE = '[Volunteers] Get Volunteers Failure',

  SAVE_VOLUNTEER = '[Volunteer] Save Volunteer',
  SAVE_VOLUNTEER_SUCCESS = '[Volunteer] Save Volunteer Success',
  SAVE_VOLUNTEER_FAILURE = '[Volunteer] Save Volunteer Failure'
}

export const getVolunteersAction = createAction(ActionTypes.GET_VOLUNTEERS);
export const getVolunteersFailureAction = createAction(
  ActionTypes.GET_VOLUNTEERS_FAILURE,
  props<{ error: any }>()
);
export const getVolunteersSuccessAction = createAction(
  ActionTypes.GET_VOLUNTEERS_SUCCESS,
  props<{ payload: any }>()
);

export const saveVolunteerAction = createAction(
  ActionTypes.SAVE_VOLUNTEER,
  props<Volunteer>()
);
export const saveVolunteerFailureAction = createAction(
  ActionTypes.SAVE_VOLUNTEER_FAILURE,
  props<{ error: any }>()
);
export const saveVolunteerSuccessAction = createAction(
  ActionTypes.SAVE_VOLUNTEER_SUCCESS,
  props<{ payload: any }>()
);
