import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap, flatMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class VolunteersEffects {
  constructor(private actions$: Actions, private router: Router) {}
}
