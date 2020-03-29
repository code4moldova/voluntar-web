import { createReducer, on, Action } from '@ngrx/store';
import { initialState, VolunteersState } from './state';
import {
  saveVolunteerAction,
  getVolunteersAction,
  getVolunteersSuccessAction,
  getVolunteersFailureAction,
  saveVolunteerSuccessAction,
  saveVolunteerFailureAction,
  getVolunteerAction,
  getVolunteerSuccessAction,
  getVolunteerFailureAction
} from './actions';

const volunteerReducer = createReducer(
  initialState,
  on(getVolunteersAction, state => ({
    ...state,
    error: null,
    isLoading: true
  })),
  on(getVolunteersSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    data: payload
  })),
  on(getVolunteersFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(saveVolunteerAction, (state, volunteer) => ({
    ...state,
    error: null,
    isLoading: true
  })),
  on(saveVolunteerSuccessAction, (state, { payload }) => ({
    ...state,
    isLoading: false,
    details: payload
  })),
  on(saveVolunteerFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(getVolunteerAction, state => ({
    ...state,
    details: null,
    isLoading: true
  })),
  on(getVolunteerSuccessAction, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      details: payload
    };
  }),
  on(getVolunteerFailureAction, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error
    };
  })
);

export function reducer(state: VolunteersState | undefined, action: Action) {
  return volunteerReducer(state, action);
}
