import { createReducer, on, Action } from '@ngrx/store';
import { initialState, VolunteersState } from './state';
import {
  saveVolunteerAction,
  getVolunteersAction,
  getVolunteersSuccessAction,
  getVolunteersFailureAction
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
  on(saveVolunteerAction, (state, volunteer) => {
    console.log(volunteer);
    return state;
  })
);

export function reducer(state: VolunteersState | undefined, action: Action) {
  return volunteerReducer(state, action);
}
