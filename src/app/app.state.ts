import { AuthState } from '@auth/auth.state';
import { BeneficiariesState } from '@beneficiaries/beneficiaries.state';
import { VolunteersState } from '@volunteers/volunteers.state';
import { DemandsState } from '@requests/demands.state';

export interface AppState {
  auth: AuthState;
  beneficiaries: BeneficiariesState;
  volunteers: VolunteersState;
  requests: DemandsState;
}
