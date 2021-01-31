import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, map, exhaustMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { DemandsService } from './demands.service';
import {
  getRequestsSuccessAction,
  getRequestsFailureAction,
  getRequestsAction,
  getRequestAction,
  getRequestSuccessAction,
  getRequestFailureAction,
  saveRequestAction,
  saveRequestFailureAction,
  saveRequestSuccessAction,
  updateRequestAction,
  updateRequestSuccessAction,
  updateRequestFailureAction,
} from './requests.actions';
import { GeolocationService } from '@shared/services/geolocation/geolocation.service';

@Injectable()
export class RequestsEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private demandsService: DemandsService
  ) {}

  getRequestsEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getRequestsAction),
      switchMap(({ page, filters }) =>
        this.demandsService.getRequests(page, filters).pipe(
          map((res) =>
            getRequestsSuccessAction({ payload: res.list, count: res.count })
          ),
          catchError((error) => of(getRequestsFailureAction({ error })))
        )
      )
    );
  });

  getRequestDetailsEffect: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getRequestAction),
      switchMap(({ id }) =>
        this.demandsService.getRequestById(id).pipe(
          map((res) => getRequestSuccessAction({ payload: res })),
          catchError((error) => of(getRequestFailureAction({ error })))
        )
      )
    );
  });

  saveRequestDetailsEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(saveRequestAction),
      exhaustMap(({ payload }) => {
        const { _id, ...withoutId } = payload;
        return this.demandsService.saveRequest(withoutId).pipe(
          map((res) => {
            return saveRequestSuccessAction({ payload: res });
          }),
          catchError((error) => of(saveRequestFailureAction({ error })))
        );
      })
    );
  });

  updateRequestDetailsEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateRequestAction),
      exhaustMap(({ payload }) => {
        return this.demandsService.updateRequest(payload).pipe(
          map((res) => {
            // this.router.navigate(['/demands/list']);
            return updateRequestSuccessAction({ payload: res });
          }),
          catchError((error) => of(updateRequestFailureAction({ error })))
        );
      })
    );
  });

  // getBeneficiaresEffect: Observable<Action> = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(getBeneficiariesByFilterAction),
  //     switchMap((action) =>
  //       this.requestService.getBeneficiariesByFilter(action.payload).pipe(
  //         map(res => getRequestsSuccessAction({ payload: res.list, count: res.count })),
  //         catchError(error => of(getRequestFailureAction({ error })))
  //       )
  //     )
  //   );
  // });
}
