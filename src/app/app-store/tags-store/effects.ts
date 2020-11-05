import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { TagsService } from '@services/tags/tags.service';
import {
  getActivityTypesTagsAction,
  getActivityTypesTagsSuccessAction,
  getTagsFailureAction,
  getAgesTagsAction,
  getAgesTagsSuccessAction,
  getAvailabilitiesTagsAction,
  getAvailabilitiesTagsSuccessAction,
  getTeamsTagsAction,
  getTeamsTagsSuccessAction,
  getOffersTagsAction,
  getOffersTagsSuccessAction,
} from './actions';

@Injectable()
export class TagsEffects {
  constructor(private actions$: Actions, private tagsService: TagsService) {}

  getActivityTypesEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getActivityTypesTagsAction),
      switchMap(() =>
        this.tagsService.getActivityTypes().pipe(
          map((res) =>
            getActivityTypesTagsSuccessAction({ payload: res.list })
          ),
          catchError((error) => of(getTagsFailureAction({ error })))
        )
      )
    );
  });

  getAgesEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAgesTagsAction),
      switchMap(() =>
        this.tagsService.getAges().pipe(
          map((res) => getAgesTagsSuccessAction({ payload: res.list })),
          catchError((error) => of(getTagsFailureAction({ error })))
        )
      )
    );
  });

  getAvailabilitiesEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAvailabilitiesTagsAction),
      switchMap(() =>
        this.tagsService.getAvailabilities().pipe(
          map((res) =>
            getAvailabilitiesTagsSuccessAction({ payload: res.list })
          ),
          catchError((error) => of(getTagsFailureAction({ error })))
        )
      )
    );
  });

  getTeamsEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTeamsTagsAction),
      switchMap(() =>
        this.tagsService.getTeams().pipe(
          map((res) => getTeamsTagsSuccessAction({ payload: res.list })),
          catchError((error) => of(getTagsFailureAction({ error })))
        )
      )
    );
  });

  getOffersEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getOffersTagsAction),
      switchMap(() =>
        this.tagsService.getOffers().pipe(
          map((res) => getOffersTagsSuccessAction({ payload: res.list })),
          catchError((error) => of(getTagsFailureAction({ error })))
        )
      )
    );
  });
}
