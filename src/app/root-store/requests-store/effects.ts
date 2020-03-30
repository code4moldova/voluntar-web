import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  catchError,
  switchMap,
  tap,
  flatMap,
  map,
  exhaustMap
} from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { RequestsService } from '@services/requests/requests.service';
import {
  getRequestsSuccessAction,
  getRequestsFailureAction,
  getRequestsAction,
  getRequestAction,
  getRequestSuccessAction,
  getRequestFailureAction,
  saveRequestAction,
  saveRequestFailureAction,
  saveRequestSuccessAction
} from './actions';

@Injectable()
export class RequestsEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private requestService: RequestsService
  ) {}

  getRequestsEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getRequestsAction),
      switchMap(() =>
        this.requestService.getRequests().pipe(
          map(res => getRequestsSuccessAction({ payload: res })),
          catchError(error => of(getRequestsFailureAction({ error })))
        )
      )
    );
  });

  getRequestDetailsEffect: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getRequestAction),
      switchMap(({ id }) =>
        this.requestService.getRequstById(id).pipe(
          map(res => getRequestSuccessAction({ payload: res })),
          catchError(error => of(getRequestFailureAction({ error })))
        )
      )
    );
  });

  saveRequestDetailsEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(saveRequestAction),
      exhaustMap(({ payload }) =>
        this.requestService.saveRequest(payload).pipe(
          map(res => saveRequestSuccessAction({ payload: res })),
          catchError(error => of(saveRequestFailureAction({ error })))
        )
      )
    );
  });
}
