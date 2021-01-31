import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/app.state';
import {
  getRequestsAction,
  getRequestAction,
  saveRequestAction,
  updateRequestAction,
  getBeneficiariesByFilterAction,
} from './demands.actions';
import {
  selectIsLoading,
  selectRequestsData,
  selectRequestsError,
  selectRequestsDetails,
  selectRequestsCount,
} from './demands.selectors';
import { IRequest, IRequestDetails } from '@shared/models';
import { DemandsService } from './demands.service';
import {
  map,
  takeUntil,
  switchMap,
  pairwise,
  filter,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { BehaviorSubject, interval, Subject, combineLatest } from 'rxjs';

export type RequestPageParams = { pageSize: number; pageIndex: number };

@Injectable({
  providedIn: 'root',
})
export class DemandsFacade {
  requests$ = this.store.pipe(select(selectRequestsData));
  isLoading$ = this.store.pipe(select(selectIsLoading));
  error$ = this.store.pipe(select(selectRequestsError));
  requestDetails$ = this.store.pipe(select(selectRequestsDetails));
  requestsCount$ = this.store.pipe(select(selectRequestsCount));

  private hasNewRequests$ = new BehaviorSubject(false);
  private newRequests$ = new BehaviorSubject(false);
  private DELAY_TIME = 1000 * 60; // 1 minute
  private audio = new Audio('/assets/Glass.wav');

  constructor(
    private store: Store<AppState>,
    private requestService: DemandsService
  ) {
    const stopPolling$ = new Subject();
    combineLatest([this.newRequests$, this.requestsCount$])
      .pipe(
        tap(([value, countFromState]) => {
          if (!value) {
            stopPolling$.next(true);
          }
        }),
        filter(([value, countFromState]) => value),
        switchMap(([value, countFromState]) => {
          return interval(this.DELAY_TIME).pipe(
            takeUntil(stopPolling$),
            switchMap(() =>
              this.requestService
                .getRequests({ pageIndex: 1, pageSize: 1 })
                .pipe(map(({ count }) => count))
            ),
            pairwise(),
            map(([prev, next]) => [next, countFromState, prev])
          );
        })
      )
      .subscribe(([count, countFromState, prev]) => {
        if (countFromState === null) {
          return;
        }
        if (countFromState < count) {
          this.audio.play();
        }
        this.hasNewRequests$.next(countFromState < count);
      });
  }

  get newRequests() {
    return this.hasNewRequests$.asObservable();
  }

  resetNewRequests() {
    this.hasNewRequests$.next(false);
  }

  getRequests(page: RequestPageParams, filters?: any) {
    this.store.dispatch(getRequestsAction({ page, filters }));
  }

  getRequestByStatus(status: string) {
    const page = {
      pageIndex: 0,
      pageSize: 1,
    };
    const filters = status
      ? {
          status,
        }
      : {};
    return this.requestService.getRequests(page, filters);
  }

  getRequestByPhone(phone: string, key: string = 'phone') {
    return this.requestService.getRequests(
      {
        pageIndex: 0,
        pageSize: 20,
      },
      {
        [key]: phone,
      }
    );
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

  getBeneficiaresByFilter(criteria: { [keys: string]: string }): void {
    this.store.dispatch(getBeneficiariesByFilterAction({ payload: criteria }));
  }

  toggleNewRequestsPolling(value: boolean) {
    this.newRequests$.next(value);
  }

  getExportRequests() {
    return this.requestService.exportRequests();
  }
}
