import { AuthState } from './auth-store/state';
import { BeneficiariesState } from '../pages/admin/beneficiaries/beneficiaries.state';
import { VolunteersState } from './volunteers-store/state';
import { RequestsState } from './requests-store/state';

export interface RootState {
  auth: AuthState;
  beneficiaries: BeneficiariesState;
  volunteers: VolunteersState;
  requests: RequestsState;
}
