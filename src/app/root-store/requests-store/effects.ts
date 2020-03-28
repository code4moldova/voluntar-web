import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap, flatMap, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { RequestsService } from '@services/requests/requests.service';
import {
  getRequestsSuccessAction,
  getRequestsFailureAction,
  getRequestsAction
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
          map(res => {
            return getRequestsSuccessAction({ payload: res });
          }),
          catchError(error => of(getRequestsFailureAction({ error })))
        )
      )
    );
  });
}
