import { AuthState } from './auth-store/state';
import { VolunteersState } from './volunteers-store/state';
import { RequestsState } from './requests-store/state';

export interface RootState {
  auth: AuthState;
  volunteers: VolunteersState;
  requests: RequestsState;
}
