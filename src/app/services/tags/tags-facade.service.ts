import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TagsState } from '@store/tags-store/state';
import {
  selectIsLoading,
  selectActivityTypesTagsError,
  selectActivityTypesTags
} from '@store/tags-store/selectors';
import { getActivityTypesTagsAction } from '@store/tags-store/actions';

@Injectable({
  providedIn: 'root'
})
export class TagsFacadeService {
  isLoading$ = this.store.pipe(select(selectIsLoading));
  error$ = this.store.pipe(select(selectActivityTypesTagsError));

  activityTypesTags$ = this.store.pipe(select(selectActivityTypesTags));

  constructor(private store: Store<TagsState>) { }

  getActivityTypesTags() {
    this.store.dispatch(getActivityTypesTagsAction());
  }

}
