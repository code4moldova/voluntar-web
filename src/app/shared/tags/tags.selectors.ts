import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TagsState } from './tags.state';

export const selectTags = createFeatureSelector<any, TagsState>('tags');

export const selectTagsIsLoading = createSelector(
  selectTags,
  (state: TagsState) => state.isLoading
);
export const selectTagsError = createSelector(
  selectTags,
  (state: TagsState) => state.error
);

export const selectActivityTypesTags = createSelector(
  selectTags,
  (state: TagsState) => state.activityTypes
);
export const selectAvailabilitiesTags = createSelector(
  selectTags,
  (state: TagsState) => state.availabilities
);
export const selectOffersTags = createSelector(
  selectTags,
  (state: TagsState) => state.offers
);
