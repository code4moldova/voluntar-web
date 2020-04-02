import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  catchError,
  switchMap,
  map,
} from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { TagsService } from '@services/tags/tags.service';
import {
  getActivityTypesTagsAction,
  getActivityTypesTagsSuccessAction,
  getActivityTypesTagsFailureAction
} from './actions';

@Injectable()
export class TagsEffects {
  constructor(
    private actions$: Actions,
    private tagsService: TagsService
  ) { }

  getActivityTypesEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getActivityTypesTagsAction),
      switchMap(() =>
        this.tagsService.getActivityType().pipe(
          map(res => getActivityTypesTagsSuccessAction({ payload: res.list })),
          catchError(error => of(getActivityTypesTagsFailureAction({ error })))
        )
      )
    );
  });
}
