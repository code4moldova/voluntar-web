import { AuthState } from './pages/auth/auth.state';
import { BeneficiariesState } from './pages/admin/beneficiaries/beneficiaries.state';
import { VolunteersState } from './pages/admin/volunteers/volunteers.state';
import { RequestsState } from './pages/admin/requests/requests.state';

export interface AppState {
  auth: AuthState;
  beneficiaries: BeneficiariesState;
  volunteers: VolunteersState;
  requests: RequestsState;
}
