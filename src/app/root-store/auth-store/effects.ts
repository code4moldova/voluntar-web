import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap, flatMap, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
  logoutAction,
} from './actions';
import { Router } from '@angular/router';
import { TokenStorage } from '@services/auth/token-storage.service';
import { AuthService } from '@services/auth/auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private tokenStorage: TokenStorage,
    private router: Router
  ) {}

  login$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ login, password }) =>
        this.authService.login({ login, password }).pipe(
          tap(() => {
            this.router.navigate(['/admin']);
          }),
          map((res) => {
            this.tokenStorage.setAccessToken(res.token);
            return loginSuccessAction({
              accessToken: res.token,
            });
          }),
          catchError((error) => of(loginFailureAction({ error })))
        )
      )
    );
  });

  logoutEffect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          console.log('logged out');
          this.tokenStorage.clear();
          this.router.navigate(['/login']);
        })
      );
    },
    { dispatch: false }
  );
}
