import { createReducer, on, Action } from '@ngrx/store';
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
} from './volunteers.actions';

const volunteerReducer = createReducer(
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
  }))
);

export function volunteersReducer(
  state: VolunteersState | undefined,
  action: Action
) {
  return volunteerReducer(state, action);
}
