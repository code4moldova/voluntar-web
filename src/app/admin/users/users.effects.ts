import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  createUserAction,
  createUserFailureAction,
  createUserSuccessAction,
  getUserDetailsAction,
  getUserDetailsFailureAction,
  getUserDetailsSuccessAction,
  getUsersAction,
  getUsersFailureAction,
  getUsersSuccessAction,
  updateUserAction,
  updateUserFailureAction,
  updateUserSuccessAction,
} from './users.actions';
import { UsersService } from './users.service';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private usersService: UsersService
  ) {}

  getUsers$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUsersAction),
      switchMap((props) =>
        this.usersService.getList(props.payload).pipe(
          map((res) =>
            getUsersSuccessAction({
              payload: res,
            })
          ),
          catchError(({ error }) => of(getUsersFailureAction({ error })))
        )
      )
    );
  });

  getUserByIdEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUserDetailsAction),
      switchMap(({ id }) =>
        this.usersService.getById(id).pipe(
          map((res) => {
            return getUserDetailsSuccessAction({
              payload: res,
            });
          }),
          catchError(({ error }) => of(getUserDetailsFailureAction({ error })))
        )
      )
    );
  });

  createUserEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(createUserAction),
      switchMap(({ payload }) => {
        const { _id, ...withoutId } = payload;
        return this.usersService.save(withoutId).pipe(
          map((res) => {
            return createUserSuccessAction({
              payload: res.user,
            });
          }),
          catchError(({ error }) => of(createUserFailureAction({ error })))
        );
      })
    );
  });

  updateUserEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUserAction),
      switchMap(({ payload }) =>
        this.usersService.update(payload).pipe(
          map((res) => {
            return updateUserSuccessAction({
              payload: res,
            });
          }),
          catchError(({ error }) => of(updateUserFailureAction({ error })))
        )
      )
    );
  });
}
