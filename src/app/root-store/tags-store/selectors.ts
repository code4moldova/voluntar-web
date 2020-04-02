import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TagsState } from './state';

export const selectTags = createFeatureSelector<any, TagsState>('tags');

export const selectIsLoading = createSelector(selectTags, (state: TagsState) => state.isLoading);
export const selectActivityTypesTags = createSelector(selectTags, (state: TagsState) => state.activityTypes);
export const selectRequestsError = createSelector(selectTags, (state: TagsState) => state.error);
