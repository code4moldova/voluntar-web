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
  getVolunteersFailureAction
} from './actions';
import { VolunteersService } from '@services/volunteers/volunteers.service';

@Injectable()
export class VolunteersEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private volunteerService: VolunteersService
  ) { }

  saveVolunteerEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(saveVolunteerAction),
      switchMap(volunteer =>
        this.volunteerService.saveVolunteer(volunteer).pipe(
          tap(() => {
            this.router.navigate(['/admin/vounteers']);
          }),
          flatMap(res => {
            return [saveVolunteerSuccessAction(res)];
          }),
          catchError(error => of(saveVolunteerFailureAction({ error })))
        )
      )
    );
  });

  getVolunteersEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getVolunteersAction),
      switchMap(() =>
        this.volunteerService.getVolunteers().pipe(
          map(res => {
            return getVolunteersSuccessAction({ payload: res });
          }),
          catchError(error => of(getVolunteersFailureAction({ error })))
        )
      )
    );
  });
}
