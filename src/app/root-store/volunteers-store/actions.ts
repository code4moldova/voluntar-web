import { createAction, props } from '@ngrx/store';
import { IVolunteer } from '@models/volunteers';

export enum ActionTypes {
  GET_VOLUNTEERS = '[Volunteers] Get Volunteers',
  GET_VOLUNTEERS_SUCCESS = '[Volunteers] Get Volunteers Success',
  GET_VOLUNTEERS_FAILURE = '[Volunteers] Get Volunteers Failure',

  GET_VOLUNTEER = '[Volunteer] Get Volunteer',

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

export const getVolunteerAction = createAction(
  ActionTypes.GET_VOLUNTEER,
  props<{ payload: IVolunteer }>()
);

export const saveVolunteerAction = createAction(
  ActionTypes.SAVE_VOLUNTEER,
  props<IVolunteer>()
);
export const saveVolunteerFailureAction = createAction(
  ActionTypes.SAVE_VOLUNTEER_FAILURE,
  props<{ error: any }>()
);
export const saveVolunteerSuccessAction = createAction(
  ActionTypes.SAVE_VOLUNTEER_SUCCESS,
  props<{ payload: any }>()
);
