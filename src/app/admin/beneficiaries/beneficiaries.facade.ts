import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from '@app/app.state';

import {
  saveBeneficiaryAction,
  updateBeneficiaryAction,
  getBeneficiariesByFilterAction,
  getBeneficiariesAction,
  getBeneficiaryAction,
  getBeneficiaryDemandsAction,
  getBeneficiaryBlockListAction,
} from './beneficiaries.actions';
import {
  selectBeneficiariesData,
  selectIsLoading,
  selectBeneficiaryDetails,
  selectError,
  selectBeneficiariesCount,
  selectDemandsError,
  selectDemandsData,
  selectDemandsCount,
  selectBlockListData,
  selectBlockListCount,
  selectBlockListIsLoading,
} from './beneficiaries.selectors';
import { Beneficiary } from './shared/beneficiary';

@Injectable({
  providedIn: 'root',
})
export class BeneficiariesFacade {
  beneficiaries$ = this.store.pipe(select(selectBeneficiariesData));
  beneficiaryDetails$ = this.store.pipe(select(selectBeneficiaryDetails));
  count$ = this.store.pipe(select(selectBeneficiariesCount));
  isLoading$ = this.store.pipe(select(selectIsLoading));
  error$ = this.store.pipe(select(selectError));

  demandsData$ = this.store.pipe(select(selectDemandsData));
  demandsCount$ = this.store.pipe(select(selectDemandsCount));

  blockListData$ = this.store.pipe(select(selectBlockListData));
  blockListCount$ = this.store.pipe(select(selectBlockListCount));
  blockListIsLoading$ = this.store.pipe(select(selectBlockListIsLoading));

  constructor(private store: Store<AppState>) {}

  saveBeneficiary(beneficiary: Beneficiary) {
    if (beneficiary._id) {
      this.store.dispatch(updateBeneficiaryAction({ payload: beneficiary }));
    } else {
      this.store.dispatch(saveBeneficiaryAction({ payload: beneficiary }));
    }
  }

  getBeneficiaries(
    page: { pageSize: number; pageIndex: number },
    filters?: any,
  ) {
    this.store.dispatch(getBeneficiariesAction({ page, filters }));
  }

  getBeneficiaryDemands(
    page: { pageSize: number; pageIndex: number },
    id: string,
  ) {
    this.store.dispatch(getBeneficiaryDemandsAction({ page, id }));
  }

  getBeneficiaryBlockList(
    page: { pageSize: number; pageIndex: number },
    filters: Record<string, string>,
  ) {
    this.store.dispatch(getBeneficiaryBlockListAction({ page, filters }));
  }

  getBeneficiaryById(id: string) {
    this.store.dispatch(getBeneficiaryAction({ id }));
  }

  getBeneficiariesByFilter(criteria: { [keys: string]: string }) {
    this.store.dispatch(getBeneficiariesByFilterAction({ payload: criteria }));
  }
}
