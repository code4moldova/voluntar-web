import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VolunteersState } from './volunteers.state';
import { IVolunteer } from '@shared/models';

export const selectVolunteers = createFeatureSelector<any, VolunteersState>(
  'volunteers'
);

export const selectIsLoading = createSelector(
  selectVolunteers,
  (state: VolunteersState): boolean => {
    return state.isLoading;
  }
);
export const selectError = createSelector(
  selectVolunteers,
  (state: VolunteersState): any => {
    return state.error;
  }
);

export const selectVolunteersData = createSelector(
  selectVolunteers,
  (state: VolunteersState): IVolunteer[] => {
    return state.data;
  }
);

export const selectVolunteersCount = createSelector(
  selectVolunteers,
  (state: VolunteersState): number => {
    return state.count;
  }
);

export const selectVolunteersDetails = createSelector(
  selectVolunteers,
  (state: VolunteersState): IVolunteer => {
    return state.details;
  }
);
