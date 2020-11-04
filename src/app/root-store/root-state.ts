import { AuthState } from './auth-store/state';
import { BeneficiariesState } from '../pages/admin/beneficiaries/beneficiaries.state';
import { VolunteersState } from '../pages/admin/volunteers/volunteers.state';
import { RequestsState } from '../pages/admin/requests/requests.state';

export interface RootState {
  auth: AuthState;
  beneficiaries: BeneficiariesState;
  volunteers: VolunteersState;
  requests: RequestsState;
}
