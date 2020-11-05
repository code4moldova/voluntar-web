import { createAction, props } from '@ngrx/store';
import {
  IActivityTypeTag,
  ISectorTag,
  IAgeTag,
  IAvailabilityTag,
  ITeamTag,
  IOfferTag,
} from '@shared/models';

export enum ActionTypes {
  GET_TAGS_FAILURE = '[Tags] Get tags Failure',

  GET_ACTIVITY_TYPES_TAGS = '[Tags] Get tags',
  GET_ACTIVITY_TYPES_TAGS_SUCCESS = '[Tags] Get Activity type tags Success',

  GET_AGES_TAGS = '[Tags] Get age tags',
  GET_AGES_TAGS_SUCCESS = '[Tags] Get age tags Success',

  GET_AVAILABILITIES_TAGS = '[Tags] Get availability tags',
  GET_AVAILABILITIES_TAGS_SUCCESS = '[Tags] Get availability tags Success',

  GET_TEAMS_TAGS = '[Tags] Get team tags',
  GET_TEAMS_TAGS_SUCCESS = '[Tags] Get team tags Success',

  GET_OFFERS_TAGS = '[Tags] Get offer tags',
  GET_OFFERS_TAGS_SUCCESS = '[Tags] Get offer tags Success',
}

export const getTagsFailureAction = createAction(
  ActionTypes.GET_TAGS_FAILURE,
  props<{ error: any }>()
);

export const getActivityTypesTagsAction = createAction(
  ActionTypes.GET_ACTIVITY_TYPES_TAGS
);
export const getActivityTypesTagsSuccessAction = createAction(
  ActionTypes.GET_ACTIVITY_TYPES_TAGS_SUCCESS,
  props<{ payload: IActivityTypeTag[] }>()
);

export const getAgesTagsAction = createAction(ActionTypes.GET_AGES_TAGS);
export const getAgesTagsSuccessAction = createAction(
  ActionTypes.GET_AGES_TAGS_SUCCESS,
  props<{ payload: IAgeTag[] }>()
);

export const getAvailabilitiesTagsAction = createAction(
  ActionTypes.GET_AVAILABILITIES_TAGS
);
export const getAvailabilitiesTagsSuccessAction = createAction(
  ActionTypes.GET_AVAILABILITIES_TAGS_SUCCESS,
  props<{ payload: IAvailabilityTag[] }>()
);

export const getTeamsTagsAction = createAction(ActionTypes.GET_TEAMS_TAGS);
export const getTeamsTagsSuccessAction = createAction(
  ActionTypes.GET_TEAMS_TAGS_SUCCESS,
  props<{ payload: ITeamTag[] }>()
);

export const getOffersTagsAction = createAction(ActionTypes.GET_OFFERS_TAGS);
export const getOffersTagsSuccessAction = createAction(
  ActionTypes.GET_OFFERS_TAGS_SUCCESS,
  props<{ payload: IOfferTag[] }>()
);
