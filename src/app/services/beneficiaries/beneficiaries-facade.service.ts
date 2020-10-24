import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { RootState } from '@store/root-state';

import {
  saveBeneficiaryAction,
  updateBeneficiaryAction,
  getBeneficiariesByFilterAction,
  getBeneficiariesAction,
  getBeneficiaryAction,
  getBeneficiaryRequestsAction,
  getBeneficiaryBlockListAction,
} from '@store/beneficiaries-store/actions';
import {
  selectBeneficiariesData,
  selectIsLoading,
  selectBeneficiaryDetails,
  selectError,
  selectBeneficiariesCount,
  selectRequestsError,
  selectRequestsData,
  selectRequestsCount,
  selectBlockListError,
  selectBlockListData,
  selectBlockListCount,
  selectBlockListIsLoading,
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

  // Requests
  requestsError$ = this.store.pipe(select(selectRequestsError));
  requestsData$ = this.store.pipe(select(selectRequestsData));
  requestsCount$ = this.store.pipe(select(selectRequestsCount));
  // BlockList
  blockListError$ = this.store.pipe(select(selectBlockListError));
  blockListData$ = this.store.pipe(select(selectBlockListData));
  blockListCount$ = this.store.pipe(select(selectBlockListCount));
  blockListIsLoading$ = this.store.pipe(select(selectBlockListIsLoading));

  constructor(private store: Store<RootState>) {}

  saveBeneficiary(beneficiary: Beneficiary) {
    if (beneficiary._id) {
      this.store.dispatch(updateBeneficiaryAction({ payload: beneficiary }));
    } else {
      this.store.dispatch(saveBeneficiaryAction({ payload: beneficiary }));
    }
  }

  getBeneficiaries(
    page: { pageSize: number; pageIndex: number },
    filters?: any
  ) {
    this.store.dispatch(getBeneficiariesAction({ page, filters }));
  }

  getBeneficiaryRequests(
    page: { pageSize: number; pageIndex: number },
    id: string
  ) {
    this.store.dispatch(getBeneficiaryRequestsAction({ page, id }));
  }

  getBeneficiaryBlockList(
    page: { pageSize: number; pageIndex: number },
    filters: Record<string, string>
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
