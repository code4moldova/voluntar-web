import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/app.state';
import {
  getDemandsRequestAction,
  saveDemandRequestAction,
  updateDemandRequestAction,
  getBeneficiariesByFilterRequestAction,
} from './demands.actions';
import {
  selectIsLoading,
  selectDemandsData,
  selectDemandsError,
  selectDemandsCount,
} from './demands.selectors';
import { DemandsService } from './demands.service';
import {
  map,
  takeUntil,
  switchMap,
  pairwise,
  filter,
  tap,
} from 'rxjs/operators';
import { BehaviorSubject, interval, Subject, combineLatest } from 'rxjs';
import { Demand } from '@demands/shared/demand';

export type DemandsPageParams = { pageSize: number; pageIndex: number };

@Injectable({
  providedIn: 'root',
})
export class DemandsFacade {
  demands$ = this.store.pipe(select(selectDemandsData));
  isLoading$ = this.store.pipe(select(selectIsLoading));
  error$ = this.store.pipe(select(selectDemandsError));
  demandsCount$ = this.store.pipe(select(selectDemandsCount));

  private hasNewDemands$ = new BehaviorSubject(false);
  private newDemands$ = new BehaviorSubject(false);
  private DELAY_TIME = 1000 * 60; // 1 minute
  private audio = new Audio('/assets/Glass.wav');

  constructor(
    private store: Store<AppState>,
    private demandsService: DemandsService,
  ) {
    const stopPolling$ = new Subject();
    combineLatest([this.newDemands$, this.demandsCount$])
      .pipe(
        tap(([value]) => {
          if (!value) {
            stopPolling$.next(true);
          }
        }),
        filter(([value]) => value),
        switchMap(([, countFromState]) => {
          return interval(this.DELAY_TIME).pipe(
            takeUntil(stopPolling$),
            switchMap(() =>
              this.demandsService
                .getDemands({ pageIndex: 1, pageSize: 1 })
                .pipe(map(({ count }) => count)),
            ),
            pairwise(),
            map(([prev, next]) => [next, countFromState, prev]),
          );
        }),
      )
      .subscribe(([count, countFromState]) => {
        if (countFromState === null) {
          return;
        }
        if (countFromState < count) {
          void this.audio.play();
        }
        this.hasNewDemands$.next(countFromState < count);
      });
  }

  get newDemands() {
    return this.hasNewDemands$.asObservable();
  }

  resetNewDemands() {
    this.hasNewDemands$.next(false);
  }

  getDemands(page: DemandsPageParams, filters?: any) {
    this.store.dispatch(getDemandsRequestAction({ page, filters }));
  }

  getDemandsByStatus(status: string) {
    return this.demandsService.getDemands(
      {
        pageIndex: 0,
        pageSize: 1,
      },
      status
        ? {
            status,
          }
        : {},
    );
  }

  saveDemand(demand: Demand) {
    this.store.dispatch(
      demand._id
        ? updateDemandRequestAction({ payload: demand })
        : saveDemandRequestAction({ payload: demand }),
    );
  }

  getBeneficiariesByFilter(criteria: { [keys: string]: string }): void {
    this.store.dispatch(
      getBeneficiariesByFilterRequestAction({ payload: criteria }),
    );
  }

  toggleNewDemandsPolling(value: boolean) {
    this.newDemands$.next(value);
  }

  getExportDemands() {
    return this.demandsService.exportDemands();
  }
}
