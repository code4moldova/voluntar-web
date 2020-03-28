import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootState } from '@store/root-state';
import { getRequestsAction } from '@store/requests-store/actions';
import {
  selectIsLoading,
  selectRequestsData
} from '@store/requests-store/selectors';

@Injectable({
  providedIn: 'root'
})
export class RequestsFacadeService {
  requests$ = this.store.pipe(select(selectRequestsData));
  isLoading$ = this.store.pipe(select(selectIsLoading));
  constructor(private store: Store<RootState>) {}

  getRequests() {
    this.store.dispatch(getRequestsAction());
  }
}
