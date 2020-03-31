import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap, flatMap, map } from 'rxjs/operators';
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
  updateVolunteerAction
} from './actions';
import { VolunteersService } from '@services/volunteers/volunteers.service';

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
            this.router.navigate(['volunteers/details', user._id]);
            return saveVolunteerSuccessAction({ payload: user });
          }),
          catchError(error => of(saveVolunteerFailureAction({ error })))
        );
      })
    );
  });

  updateVolunteerEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateVolunteerAction),
      switchMap(({ payload }) => {
        return this.volunteerService.updateVolunteer(payload).pipe(
          map(res => {
            return saveVolunteerSuccessAction({ payload: res });
          }),
          catchError(error => of(saveVolunteerFailureAction({ error })))
        );
      })
    );
  });

  getVolunteersEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getVolunteersAction),
      switchMap(() =>
        this.volunteerService.getVolunteers().pipe(
          map(res => {
            return getVolunteersSuccessAction({ payload: res.list });
          }),
          catchError(error => of(getVolunteersFailureAction({ error })))
        )
      )
    );
  });

  getVolunteerByIdEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getVolunteerAction),
      switchMap(action =>
        this.volunteerService.getVolunteerById(action.id).pipe(
          map(res => {
            return getVolunteerSuccessAction({ payload: res });
          }),
          catchError(error => of(getVolunteersFailureAction({ error })))
        )
      )
    );
  });
}
