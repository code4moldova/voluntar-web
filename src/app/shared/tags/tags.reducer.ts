import { Action, createReducer, on } from '@ngrx/store';
import { initialState, TagsState } from './tags.state';
import {
  getActivityTypesTagsAction,
  getActivityTypesTagsSuccessAction,
  getAgesTagsAction,
  getAgesTagsSuccessAction,
  getAvailabilitiesTagsAction,
  getAvailabilitiesTagsSuccessAction,
  getOffersTagsAction,
  getOffersTagsSuccessAction,
  getTagsFailureAction,
} from './tags.actions';

export const tagsReducer = createReducer<TagsState, Action>(
  initialState,
  on(getTagsFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Activity Types
  on(getActivityTypesTagsAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(getActivityTypesTagsSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    activityTypes: payload,
  })),

  // Ages
  on(getAgesTagsAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(getAgesTagsSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    ages: payload,
  })),

  // Availabilities
  on(getAvailabilitiesTagsAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(getAvailabilitiesTagsSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    availabilities: payload,
  })),

  // Tags
  on(getOffersTagsAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(getOffersTagsSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    offers: payload,
  }))
);
