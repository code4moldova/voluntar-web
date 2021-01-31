import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  saveVolunteerAction,
  saveVolunteerSuccessAction,
  saveVolunteerFailureAction,
  getVolunteersAction,
  getVolunteersSuccessAction,
  getVolunteersFailureAction,
  getVolunteerAction,
  getVolunteerSuccessAction,
  updateVolunteerAction,
  getVolunteersByFilterAction,
  getVolunteersByFilterSuccessAction,
  getVolunteersByFilterFailureAction,
} from './volunteers.actions';
import { VolunteersService } from './volunteers.service';

@Injectable()
export class VolunteersEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private volunteerService: VolunteersService
  ) {}

  saveVolunteerEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(saveVolunteerAction),
      switchMap(({ payload }) => {
        const { _id, ...withoutId } = payload;
        return this.volunteerService.saveVolunteer(withoutId).pipe(
          map(({ user }) => {
            return saveVolunteerSuccessAction({ payload: user });
          }),
          catchError(({ error }) => of(saveVolunteerFailureAction({ error })))
        );
      })
    );
  });

  updateVolunteerEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateVolunteerAction),
      switchMap(({ payload }) => {
        return this.volunteerService.updateVolunteer(payload).pipe(
          map((res) => {
            return saveVolunteerSuccessAction({ payload: res });
          }),
          catchError(({ error }) => of(saveVolunteerFailureAction({ error })))
        );
      })
    );
  });

  getVolunteersEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getVolunteersAction),
      switchMap(({ page, filters }) =>
        this.volunteerService.getVolunteers(page, filters).pipe(
          map((res) => {
            return getVolunteersSuccessAction({
              payload: res.list,
              count: res.count,
            });
          }),
          catchError((error) => of(getVolunteersFailureAction({ error })))
        )
      )
    );
  });

  getVolunteerByIdEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getVolunteerAction),
      switchMap((action) =>
        this.volunteerService.getVolunteerById(action.id).pipe(
          map((res) => {
            return getVolunteerSuccessAction({ payload: res });
          }),
          catchError((error) => of(getVolunteersFailureAction({ error })))
        )
      )
    );
  });

  getVolunteersByFilterffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getVolunteersByFilterAction),
      switchMap((action) =>
        this.volunteerService.getVolunteersByFilter(action.payload).pipe(
          map((res) => {
            return getVolunteersByFilterSuccessAction({ payload: res.list });
          }),
          catchError((error) =>
            of(getVolunteersByFilterFailureAction({ error }))
          )
        )
      )
    );
  });
}
