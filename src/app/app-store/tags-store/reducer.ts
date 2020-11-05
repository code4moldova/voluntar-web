import { createReducer, on, Action } from '@ngrx/store';
import { initialState, TagsState } from './state';
import {
  getActivityTypesTagsAction,
  getTagsFailureAction,
  getActivityTypesTagsSuccessAction,
  getAgesTagsSuccessAction,
  getAvailabilitiesTagsSuccessAction,
  getTeamsTagsSuccessAction,
  getOffersTagsSuccessAction,
  getAgesTagsAction,
  getAvailabilitiesTagsAction,
  getTeamsTagsAction,
  getOffersTagsAction,
} from './actions';

const tagsReducer = createReducer(
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

  // Teams
  on(getTeamsTagsAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(getTeamsTagsSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    teams: payload,
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

export function reducer(state: TagsState | undefined, action: Action) {
  return tagsReducer(state, action);
}
