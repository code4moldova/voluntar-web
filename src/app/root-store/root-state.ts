import { AuthState } from './auth-store/state';
import { BeneficiariesState } from './beneficiaries-store/state';
import { VolunteersState } from './volunteers-store/state';
import { RequestsState } from './requests-store/state';

export interface RootState {
  auth: AuthState;
  beneficiaries: BeneficiariesState;
  volunteers: VolunteersState;
  requests: RequestsState;
}
