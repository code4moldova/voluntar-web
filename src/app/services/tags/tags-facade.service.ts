import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TagsState } from '@store/tags-store/state';
import {
  selectTagsIsLoading,
  selectTagsError,
  selectActivityTypesTags,
} from '@store/tags-store/selectors';
import { getActivityTypesTagsAction } from '@store/tags-store/actions';

@Injectable({
  providedIn: 'root'
})
export class TagsFacadeService {
  isLoading$ = this.store.pipe(select(selectTagsIsLoading));
  error$ = this.store.pipe(select(selectTagsError));

  activityTypesTags$ = this.store.pipe(select(selectActivityTypesTags));

  constructor(private store: Store<TagsState>) { }

  getActivityTypesTags() {
    this.store.dispatch(getActivityTypesTagsAction());
  }
}
