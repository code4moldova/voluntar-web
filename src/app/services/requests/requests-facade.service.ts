import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootState } from '@store/root-state';
import {
  getRequestsAction,
  getRequestAction,
  saveRequestAction,
  updateRequestAction
} from '@store/requests-store/actions';
import {
  selectIsLoading,
  selectRequestsData,
  selectRequestsError,
  selectRequestsDetails,
  selectZones
} from '@store/requests-store/selectors';
import { IRequest, IRequestDetails } from '@models/requests';

@Injectable({
  providedIn: 'root'
})
export class RequestsFacadeService {
  requests$ = this.store.pipe(select(selectRequestsData));
  isLoading$ = this.store.pipe(select(selectIsLoading));
  error$ = this.store.pipe(select(selectRequestsError));
  requestDetails$ = this.store.pipe(select(selectRequestsDetails));
  zones$ = this.store.pipe(select(selectZones));

  constructor(private store: Store<RootState>) { }

  getRequests() {
    this.store.dispatch(getRequestsAction());
  }

  getRequestById(id: string) {
    this.store.dispatch(getRequestAction({ id }));
  }

  saveRequest(request: IRequest | IRequestDetails) {
    if (request._id) {
      this.store.dispatch(
        updateRequestAction({ payload: request as IRequestDetails })
      );
    } else {
      this.store.dispatch(saveRequestAction({ payload: request }));
    }
  }
}
