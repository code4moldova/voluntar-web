import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TagsState } from '@store/tags-store/state';
import {
  selectTagsIsLoading,
  selectTagsError,
  selectActivityTypesTags,
  selectAgesTags,
  selectAvailabilitiesTags,
  selectTeamsTags,
  selectOffersTags,
} from '@store/tags-store/selectors';
import { map } from 'rxjs/operators';
// import { getActivityTypesTagsAction } from '@store/tags-store/actions';

@Injectable({
  providedIn: 'root',
})
export class TagsFacadeService {
  isLoading$ = this.store.pipe(select(selectTagsIsLoading));
  error$ = this.store.pipe(select(selectTagsError));

  activityTypesTags$ = this.store.pipe(select(selectActivityTypesTags));
  agesTags$ = this.store.pipe(select(selectAgesTags));
  availabilitiesTags$ = this.store.pipe(select(selectAvailabilitiesTags));
  availabilitiesById$ = (id: any) =>
    this.store
      .pipe(select(selectAvailabilitiesTags))
      .pipe(map((tags) => tags.find((t) => t._id === id)));
  teamsTags$ = this.store.pipe(select(selectTeamsTags));
  offersTags$ = this.store.pipe(select(selectOffersTags));

  constructor(private store: Store<TagsState>) {}

  // getActivityTypesTags() {
  //   this.store.dispatch(getActivityTypesTagsAction());
  // }
}
