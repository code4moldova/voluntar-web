import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VolunteersState } from './state';
import { IVolunteer } from '@models/volunteers';

export const selectVolunteers = createFeatureSelector<any, VolunteersState>(
  'volunteers'
);

export const selectIsLoading = createSelector(
  selectVolunteers,
  (state: VolunteersState): boolean => {
    return state.isLoading;
  }
);

export const selectVolunteersData = createSelector(
  selectVolunteers,
  (state: VolunteersState): IVolunteer[] => {
    return state.data;
  }
);
