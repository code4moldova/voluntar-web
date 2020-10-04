import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap, flatMap, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  getBeneficiaryAction,
  getBeneficiarySuccessAction,
  getBeneficiaryFailureAction,
  saveBeneficiaryAction,
  saveBeneficiarySuccessAction,
  saveBeneficiaryFailureAction,
  updateBeneficiaryAction,
  updateBeneficiarySuccessAction,
  updateBeneficiaryFailureAction,
  getBeneficiariesAction,
  getBeneficiariesSuccessAction,
  getBeneficiariesFailureAction,
  getBeneficiariesByFilterAction,
  getBeneficiariesByFilterSuccessAction,
  getBeneficiariesByFilterFailureAction
} from './actions';

import { BeneficiariesService } from '@services/beneficiaries/beneficiaries.service';

@Injectable()
export class BeneficiariesEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private service: BeneficiariesService
  ) { }

  getBeneficiaryByIdEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getBeneficiaryAction),
      switchMap((action) =>
        this.service.getBeneficiaryById(action.id).pipe(
          map((res) => {
            return getBeneficiarySuccessAction({ payload: res });
          }),
          catchError((error) => of(getBeneficiaryFailureAction({ error })))
        )
      )
    );
  });

  saveBeneficiaryEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(saveBeneficiaryAction),
      switchMap(({ payload }) => {
        const { _id, ...withoutId } = payload;
        return this.service.saveBeneficiary(withoutId).pipe(
          map(({ user }) => {
            this.router.navigate(['beneficiaries/details', user._id]);
            return saveBeneficiarySuccessAction({ payload: user });
          }),
          catchError(({ error }) => of(saveBeneficiaryFailureAction({ error })))
        );
      })
    );
  });

  updateBeneficiaryEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateBeneficiaryAction),
      switchMap(({ payload }) => {
        return this.service.updateBeneficiary(payload).pipe(
          map((res) => {
            return saveBeneficiarySuccessAction({ payload: res });
          }),
          catchError(({ error }) => of(saveBeneficiaryFailureAction({ error })))
        );
      })
    );
  });

  getBeneficiariesEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getBeneficiariesAction),
      switchMap(({ page, filters }) =>
        this.service.getBeneficiaries(page, filters).pipe(
          map((res) => {
            return getBeneficiariesSuccessAction({
              payload: res.list,
              count: res.count,
            });
          }),
          catchError((error) => of(getBeneficiariesFailureAction({ error })))
        )
      )
    );
  });

  getBeneficiariesByFilterffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getBeneficiariesByFilterAction),
      switchMap((action) =>
        this.service.getBeneficiariesByFilter(action.payload).pipe(
          map((res) => {
            return getBeneficiariesByFilterSuccessAction({ payload: res.list });
          }),
          catchError((error) =>
            of(getBeneficiariesByFilterFailureAction({ error }))
          )
        )
      )
    );
  });
}
