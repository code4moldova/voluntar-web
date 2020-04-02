import { createAction, props } from '@ngrx/store';
import { IActivityTypeTag } from '@models/tags';

export enum ActionTypes {
  GET_ACTIVITY_TYPES_TAGS = '[Tags] Get Activity types tags',
  GET_ACTIVITY_TYPES_TAGS_SUCCESS = '[Tags] Get Activity types tags Success',
  GET_ACTIVITY_TYPES_TAGS_FAILURE = '[Tags] Get Activity types tags Failure',
}

export const getActivityTypesTagsAction = createAction(ActionTypes.GET_ACTIVITY_TYPES_TAGS);
export const getActivityTypesTagsFailureAction = createAction(
  ActionTypes.GET_ACTIVITY_TYPES_TAGS_FAILURE,
  props<{ error: any }>()
);
export const getActivityTypesTagsSuccessAction = createAction(
  ActionTypes.GET_ACTIVITY_TYPES_TAGS_SUCCESS,
  props<{ payload: IActivityTypeTag[] }>()
);
