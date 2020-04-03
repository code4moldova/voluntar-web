import { createReducer, on, Action } from '@ngrx/store';
import { initialState, TagsState } from './state';
import {
  getActivityTypesTagsAction,
  getActivityTypesTagsFailureAction,
  getActivityTypesTagsSuccessAction,
} from './actions';

const tagsReducer = createReducer(
  initialState,

  // Activity types
  on(getActivityTypesTagsAction, state => ({
    ...state,
    error: null,
    isLoading: true
  })),
  on(getActivityTypesTagsSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    activityTypes: payload
  })),
  on(getActivityTypesTagsFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
);

export function reducer(state: TagsState | undefined, action: Action) {
  return tagsReducer(state, action);
}
