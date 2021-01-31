import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  getBeneficiariesAction,
  getBeneficiariesByFilterAction,
  getBeneficiariesByFilterFailureAction,
  getBeneficiariesByFilterSuccessAction,
  getBeneficiariesFailureAction,
  getBeneficiariesSuccessAction,
  getBeneficiaryAction,
  getBeneficiaryBlockListAction,
  getBeneficiaryBlockListFailureAction,
  getBeneficiaryBlockListSuccessAction,
  getBeneficiaryFailureAction,
  getBeneficiaryRequestsAction,
  getBeneficiaryRequestsFailureAction,
  getBeneficiaryRequestsSuccessAction,
  getBeneficiarySuccessAction,
  saveBeneficiaryAction,
  saveBeneficiaryFailureAction,
  saveBeneficiarySuccessAction,
  updateBeneficiaryAction,
  updateBeneficiaryFailureAction,
  updateBeneficiarySuccessAction,
} from './beneficiaries.actions';

import { BeneficiariesService } from './beneficiaries.service';

@Injectable()
export class BeneficiariesEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private service: BeneficiariesService
  ) {}

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
            return updateBeneficiarySuccessAction({ payload: res });
          }),
          catchError(({ error }) =>
            of(updateBeneficiaryFailureAction({ error }))
          )
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

  getBeneficiariesByFilterEffect$: Observable<Action> = createEffect(() => {
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

  getBeneficiaryRequestsEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getBeneficiaryRequestsAction),
      switchMap(({ page, id }) =>
        this.service.getBeneficiaryRequests(page, id).pipe(
          map((res) => {
            return getBeneficiaryRequestsSuccessAction({
              payload: res.list,
              count: res.count,
            });
          }),
          catchError((error) =>
            of(getBeneficiaryRequestsFailureAction({ error }))
          )
        )
      )
    );
  });

  getBeneficiaryBlockListEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getBeneficiaryBlockListAction),
      switchMap(({ page, filters }) =>
        this.service
          .getBeneficiariesByFilterPaged(page, {
            ...filters,
            black_list: 'true',
          })
          .pipe(
            map((res) => {
              return getBeneficiaryBlockListSuccessAction({
                payload: res.list,
                count: res.count,
              });
            }),
            catchError((error) =>
              of(getBeneficiaryBlockListFailureAction({ error }))
            )
          )
      )
    );
  });
}
