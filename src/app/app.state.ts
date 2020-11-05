import { AuthState } from './auth/auth.state';
import { BeneficiariesState } from './admin/beneficiaries/beneficiaries.state';
import { VolunteersState } from './admin/volunteers/volunteers.state';
import { RequestsState } from './admin/requests/requests.state';

export interface AppState {
  auth: AuthState;
  beneficiaries: BeneficiariesState;
  volunteers: VolunteersState;
  requests: RequestsState;
}
