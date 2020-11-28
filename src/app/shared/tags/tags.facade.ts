import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TagsState } from './tags.state';
import {
  selectActivityTypesTags,
  selectAgesTags,
  selectAvailabilitiesTags,
  selectOffersTags,
  selectTagsError,
  selectTagsIsLoading,
} from './tags.selectors';
import { map } from 'rxjs/operators';
import { TagsService } from './tags.service';

@Injectable({
  providedIn: 'root',
})
export class TagsFacade {
  private statusOptions = [
    {
      label: 'New',
      _id: 'new',
    },
    {
      label: 'In progress',
      _id: 'onprogress',
    },
    {
      label: 'Cancelled',
      _id: 'cancelled',
    },
    {
      label: 'Done',
      _id: 'done',
    },
  ];

  isLoading$ = this.store.pipe(select(selectTagsIsLoading));
  error$ = this.store.pipe(select(selectTagsError));

  activityTypesTags$ = this.store.pipe(select(selectActivityTypesTags));
  agesTags$ = this.store.pipe(select(selectAgesTags));
  availabilitiesTags$ = this.store.pipe(select(selectAvailabilitiesTags));
  offersTags$ = this.store.pipe(select(selectOffersTags));

  availabilitiesById$ = (id: any) =>
    this.store
      .pipe(select(selectAvailabilitiesTags))
      .pipe(map((tags) => tags.find((t) => t._id === id)));

  constructor(
    private store: Store<TagsState>,
    private tagsService: TagsService
  ) {}

  getStatusOptions() {
    return this.statusOptions;
  }
}
