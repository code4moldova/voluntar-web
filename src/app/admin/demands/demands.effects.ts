import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { DemandsService } from './demands.service';
import {
  getDemandFailureAction,
  getDemandRequestAction,
  getDemandsFailureAction,
  getDemandsRequestAction,
  getDemandsSuccessAction,
  getDemandSuccessAction,
  saveDemandFailureAction,
  saveDemandRequestAction,
  saveDemandSuccessAction,
  updateDemandFailureAction,
  updateDemandRequestAction,
  updateDemandSuccessAction,
} from './demands.actions';

@Injectable()
export class DemandsEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private demandsService: DemandsService,
  ) {}

  getDemandsEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getDemandsRequestAction),
      switchMap(({ page, filters }) =>
        this.demandsService.getDemands(page, filters).pipe(
          map((res) =>
            getDemandsSuccessAction({ payload: res.list, count: res.count }),
          ),
          catchError((error) => of(getDemandsFailureAction({ error }))),
        ),
      ),
    );
  });

  getDemandDetailsEffect: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getDemandRequestAction),
      switchMap(({ id }) =>
        this.demandsService.getDemand(id).pipe(
          map((res) => getDemandSuccessAction({ payload: res })),
          catchError((error) => of(getDemandFailureAction({ error }))),
        ),
      ),
    );
  });

  saveDemandDetailsEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(saveDemandRequestAction),
      exhaustMap(({ payload }) => {
        const { _id, ...withoutId } = payload;
        return this.demandsService.saveDemand(withoutId).pipe(
          map((res) => {
            return saveDemandSuccessAction({ payload: res });
          }),
          catchError((error) => of(saveDemandFailureAction({ error }))),
        );
      }),
    );
  });

  updateDemandDetailsEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateDemandRequestAction),
      exhaustMap(({ payload }) => {
        return this.demandsService.updateDemand(payload).pipe(
          map((res) => {
            // this.router.navigate(['/demands/list']);
            return updateDemandSuccessAction({ payload: res });
          }),
          catchError((error) => of(updateDemandFailureAction({ error }))),
        );
      }),
    );
  });
}
