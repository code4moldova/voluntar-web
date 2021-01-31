import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TagsState } from './tags.state';
import {
  selectActivityTypesTags,
  selectAvailabilitiesTags,
  selectOffersTags,
} from './tags.selectors';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TagsFacade {
  activityTypesTags$ = this.store.pipe(select(selectActivityTypesTags));

  offersTags$ = this.store.pipe(select(selectOffersTags));

  availabilitiesById$ = (id: any) =>
    this.store
      .pipe(select(selectAvailabilitiesTags))
      .pipe(map((tags) => tags.find((t) => t._id === id)));

  constructor(private store: Store<TagsState>) {}
}
