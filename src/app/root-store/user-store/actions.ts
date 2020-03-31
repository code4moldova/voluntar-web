import { Action, createAction, props } from '@ngrx/store';

export enum ActionTypes {
  LOGIN = '[User] Login',
  LOGIN_SUCCESS = '[User] Login Success',
  LOGIN_FAILURE = '[User] Login Failure',

  LOGOUT = '[User] Logout'
}

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ login: string; password: string }>()
);
export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{ error: string }>()
);
export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ accessToken: string; refreshToken?: string }>()
);

export const logoutAction = createAction(ActionTypes.LOGOUT);
