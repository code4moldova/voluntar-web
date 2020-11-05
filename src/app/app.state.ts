import { AuthState } from '@auth/auth.state';
import { BeneficiariesState } from '@beneficiaries/beneficiaries.state';
import { VolunteersState } from './admin/volunteers/volunteers.state';
import { RequestsState } from '@requests/requests.state';

export interface AppState {
  auth: AuthState;
  beneficiaries: BeneficiariesState;
  volunteers: VolunteersState;
  requests: RequestsState;
}
