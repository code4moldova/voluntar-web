import { createReducer, on, Action } from '@ngrx/store';
import { initialState, VolunteersState } from './state';

const customerReducer = createReducer(initialState);

export function reducer(state: VolunteersState | undefined, action: Action) {
  return customerReducer(state, action);
}
