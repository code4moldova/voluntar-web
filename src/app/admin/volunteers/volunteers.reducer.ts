import { createReducer, on } from '@ngrx/store';
import { initialState, VolunteersState } from './volunteers.state';
import {
  saveVolunteerAction,
  getVolunteersAction,
  getVolunteersSuccessAction,
  getVolunteersFailureAction,
  saveVolunteerSuccessAction,
  saveVolunteerFailureAction,
  getVolunteerAction,
  getVolunteerSuccessAction,
  getVolunteerFailureAction,
  getVolunteersByFilterAction,
  getVolunteersByFilterSuccessAction,
  getVolunteersByFilterFailureAction,
  updateVolunteerAction,
  updateVolunteerSuccessAction,
  updateVolunteerFailureAction,
  getVolunteerDemandsAction,
  getVolunteerDemandsSuccessAction,
  getVolunteerDemandsFailureAction,
} from './volunteers.actions';

export const volunteersReducer = createReducer<VolunteersState>(
  initialState,
  on(getVolunteersAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(getVolunteersSuccessAction, (state, { payload, count }) => ({
    ...state,
    isLoading: false,
    data: payload,
    count,
  })),
  on(getVolunteersFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(saveVolunteerAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(saveVolunteerSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    details: payload,
  })),
  on(saveVolunteerFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(updateVolunteerAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(updateVolunteerSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    details: payload,
  })),
  on(updateVolunteerFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(getVolunteerAction, (state) => ({
    ...state,
    details: null,
    isLoading: true,
  })),
  on(getVolunteerSuccessAction, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      details: payload,
      error: null,
    };
  }),
  on(getVolunteerFailureAction, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  }),
  on(getVolunteersByFilterAction, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(getVolunteersByFilterSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    data: payload,
  })),
  on(getVolunteersByFilterFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Volunteer demands history
  on(getVolunteerDemandsAction, (state) => ({
    ...state,
    demands: { ...state.demands, isLoading: true, error: null },
  })),
  on(getVolunteerDemandsSuccessAction, (state, { payload, count }) => ({
    ...state,
    demands: { ...state.demands, isLoading: false, data: payload, count },
  })),
  on(getVolunteerDemandsFailureAction, (state, { error }) => ({
    ...state,
    demands: { ...state.demands, isLoading: false, error },
  })),
);
