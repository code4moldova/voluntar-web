import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap, flatMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { saveVolunteerAction, saveVolunteerSuccessAction, saveVolunteerFailureAction } from './actions';
import { VolunteersService } from '@services/volunteers/volunteers.service';

@Injectable()
export class VolunteersEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private volunteeerService: VolunteersService
  ) { }

  saveVolunteer$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(saveVolunteerAction),
      switchMap((volunteer) =>
        this.volunteeerService.saveVolunteer(volunteer).pipe(
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
}
