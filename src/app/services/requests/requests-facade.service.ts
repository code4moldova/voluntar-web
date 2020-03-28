import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from '@store/root-state';

@Injectable({
  providedIn: 'root'
})
export class RequestsFacadeService {
  requests$ = of([]);
  isLoading$ = of(false);
  constructor(private store: Store<RootState>) {}

  getRequests() {
    // this.store.dispatch();
  }
}
