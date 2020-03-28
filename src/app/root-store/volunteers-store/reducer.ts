import { createReducer, on, Action } from '@ngrx/store';
import { initialState, VolunteersState } from './state';
import { saveVolunteerAction } from './actions';

const customerReducer = createReducer(initialState,
  on(saveVolunteerAction, ((state, volunteer) => {
    console.log(volunteer);
    return state;
  }))
);

export function reducer(state: VolunteersState | undefined, action: Action) {
  return customerReducer(state, action);
}
