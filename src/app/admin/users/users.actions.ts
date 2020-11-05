import { createAction, props } from '@ngrx/store';
import { IUser } from '@shared/models';

export enum ActionTypes {
  GET_USERS = '[USERS] Get Users',
  GET_USERS_SUCCESS = '[USERS] Get Users Success',
  GET_USERS_FAILURE = '[USERS] Get Users Failure',

  GET_USER_DETAILS = '[USERS] Get User details',
  GET_USER_DETAILS_SUCCESS = '[USERS] Get User details Success',
  GET_USER_DETAILS_FAILURE = '[USERS] Get User details Failure',

  CREATE_USER = '[USERS] Create User',
  CREATE_USER_SUCCESS = '[USERS] Create User Success',
  CREATE_USER_FAILURE = '[USERS] Create User Failure',

  UPDATE_USER = '[USERS] Update User',
  UPDATE_USER_SUCCESS = '[USERS] Update User Success',
  UPDATE_USER_FAILURE = '[USERS] Update User Failure',
}

export const getUsersAction = createAction(ActionTypes.GET_USERS);
export const getUsersFailureAction = createAction(
  ActionTypes.GET_USERS_FAILURE,
  props<{ error: any }>()
);
export const getUsersSuccessAction = createAction(
  ActionTypes.GET_USERS_SUCCESS,
  props<{ payload: IUser[] }>()
);

export const getUserDetailsAction = createAction(
  ActionTypes.GET_USER_DETAILS,
  props<{ id: string }>()
);
export const getUserDetailsFailureAction = createAction(
  ActionTypes.GET_USER_DETAILS_FAILURE,
  props<{ error: any }>()
);
export const getUserDetailsSuccessAction = createAction(
  ActionTypes.GET_USER_DETAILS_SUCCESS,
  props<{ payload: IUser }>()
);

export const createUserAction = createAction(
  ActionTypes.CREATE_USER,
  props<{ payload: IUser }>()
);
export const createUserFailureAction = createAction(
  ActionTypes.CREATE_USER_FAILURE,
  props<{ error: any }>()
);
export const createUserSuccessAction = createAction(
  ActionTypes.CREATE_USER_SUCCESS,
  props<{ payload: IUser }>()
);

export const updateUserAction = createAction(
  ActionTypes.UPDATE_USER,
  props<{ payload: IUser }>()
);
export const updateUserFailureAction = createAction(
  ActionTypes.UPDATE_USER_FAILURE,
  props<{ error: any }>()
);
export const updateUserSuccessAction = createAction(
  ActionTypes.UPDATE_USER_SUCCESS,
  props<{ payload: IUser }>()
);
