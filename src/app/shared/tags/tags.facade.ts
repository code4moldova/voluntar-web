import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TagsState } from './tags.state';
import {
  selectTagsIsLoading,
  selectTagsError,
  selectActivityTypesTags,
  selectAgesTags,
  selectAvailabilitiesTags,
  selectTeamsTags,
  selectOffersTags,
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
  teamsTags$ = this.store.pipe(select(selectTeamsTags));
  offersTags$ = this.store.pipe(select(selectOffersTags));

  availabilitiesById$ = (id: any) =>
    this.store
      .pipe(select(selectAvailabilitiesTags))
      .pipe(map((tags) => tags.find((t) => t._id === id)));

  constructor(
    private store: Store<TagsState>,
    private tagsService: TagsService
  ) {}

  getRandomWord() {
    return this.tagsService.getRandomWord().pipe(map(({ secret }) => secret));
  }

  getStatusOptions() {
    return this.statusOptions;
  }
}
