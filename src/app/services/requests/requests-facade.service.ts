import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootState } from '@store/root-state';
import { getRequestsAction, getRequestAction, saveRequestAction } from '@store/requests-store/actions';
import {
  selectIsLoading,
  selectRequestsData,
  selectRequestsError,
  selectRequestsDetails
} from '@store/requests-store/selectors';
import { IRequest } from '@models/requests';

@Injectable({
  providedIn: 'root'
})
export class RequestsFacadeService {
  requests$ = this.store.pipe(select(selectRequestsData));
  isLoading$ = this.store.pipe(select(selectIsLoading));
  error$ = this.store.pipe(select(selectRequestsError));
  requestDetails$ = this.store.pipe(select(selectRequestsDetails));
  constructor(private store: Store<RootState>) { }

  getRequests() {
    this.store.dispatch(getRequestsAction());
  }

  getRequestById(id: number) {
    this.store.dispatch(getRequestAction({ id }));
  }

  saveRequest(request: IRequest) {
    this.store.dispatch(saveRequestAction(request));
  }
}
