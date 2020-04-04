import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootState } from '@store/root-state';
import {
  getRequestsAction,
  getRequestAction,
  saveRequestAction,
  updateRequestAction,
} from '@store/requests-store/actions';
import {
  selectIsLoading,
  selectRequestsData,
  selectRequestsError,
  selectRequestsDetails,
  selectZones,
} from '@store/requests-store/selectors';
import { IRequest, IRequestDetails } from '@models/requests';
import { RequestsService } from './requests.service';
import {
  map,
  takeUntil,
  switchMap,
  pairwise,
  filter,
  tap,
} from 'rxjs/operators';
import { BehaviorSubject, interval, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestsFacadeService {
  requests$ = this.store.pipe(select(selectRequestsData));
  isLoading$ = this.store.pipe(select(selectIsLoading));
  error$ = this.store.pipe(select(selectRequestsError));
  requestDetails$ = this.store.pipe(select(selectRequestsDetails));
  zones$ = this.store.pipe(select(selectZones));

  private hasNewRequests$ = new BehaviorSubject(false);
  private newRequests$ = new BehaviorSubject(true);
  private DELAY_TIME = 5 * 1000 * 1;
  private audio = new Audio('/assets/Glass.wav');

  constructor(
    private store: Store<RootState>,
    private requestService: RequestsService
  ) {
    const stopPolling$ = new Subject();
    this.newRequests$
      .pipe(
        tap((value) => {
          if (!value) {
            console.log('stop polling');
            stopPolling$.next(true);
          }
        }),
        filter((value) => value)
      )
      .subscribe((value) => {
        console.log('start polling');
        interval(this.DELAY_TIME)
          .pipe(
            takeUntil(stopPolling$),
            switchMap(() =>
              this.requestService.getRequests().pipe(map(({ count }) => count))
            ),
            pairwise()
          )
          .subscribe(([before, after]) => {
            if (before !== after) {
              this.audio.play();
            }
            this.hasNewRequests$.next(before !== after);
          });
      });
  }

  get newRequests() {
    return this.hasNewRequests$.asObservable();
  }

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

  toggleNewRequestsPolling(value: boolean) {
    this.newRequests$.next(value);
  }
}
