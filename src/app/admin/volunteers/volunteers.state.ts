import { Volunteer } from './shared/volunteer';
import { baseInitialState, BaseState } from '@app/admin/shared/shared-states';

export type VolunteersState = BaseState<Volunteer>;

export const initialState: VolunteersState = {
  ...baseInitialState,
};
