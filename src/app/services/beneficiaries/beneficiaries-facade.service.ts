import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { RootState } from '@store/root-state';

import {
  saveBeneficiaryAction,
  updateBeneficiaryAction,
  getBeneficiariesByFilterAction,
  getBeneficiariesAction,
  getBeneficiaryAction,
} from '@store/beneficiaries-store/actions';
import {
  selectBeneficiariesData,
  selectIsLoading,
  selectBeneficiaryDetails,
  selectError,
  selectBeneficiariesCount,
} from '@store/beneficiaries-store/selectors';
import { Beneficiary } from '@models/beneficiary';

@Injectable({
  providedIn: 'root',
})
export class BeneficiariesFacadeService {
  beneficiaries$ = this.store.pipe(select(selectBeneficiariesData));
  beneficiaryDetails$ = this.store.pipe(select(selectBeneficiaryDetails));
  count$ = this.store.pipe(select(selectBeneficiariesCount));
  isLoading$ = this.store.pipe(select(selectIsLoading));
  error$ = this.store.pipe(select(selectError));

  constructor(private store: Store<RootState>) { }

  saveBeneficiary(beneficiary: Beneficiary) {
    if (beneficiary._id) {
      this.store.dispatch(updateBeneficiaryAction({ payload: beneficiary }));
    } else {
      this.store.dispatch(saveBeneficiaryAction({ payload: beneficiary }));
    }
  }

  getBeneficiaries(page: { pageSize: number; pageIndex: number }, filters?: any) {
    this.store.dispatch(getBeneficiariesAction({ page, filters }));
  }

  getBeneficiaryById(id: string) {
    this.store.dispatch(getBeneficiaryAction({ id }));
  }

  getBeneficiariesByFilter(criteria: { [keys: string]: string }) {
    this.store.dispatch(getBeneficiariesByFilterAction({ payload: criteria }));
  }
}
