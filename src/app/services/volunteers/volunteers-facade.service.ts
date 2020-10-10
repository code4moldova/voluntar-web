import { Injectable } from '@angular/core';
import {
  saveVolunteerAction,
  updateVolunteerAction,
  getVolunteersByFilterAction,
} from '@store/volunteers-store/actions';
import { Store, select } from '@ngrx/store';
import { RootState } from '@store/root-state';
import {
  getVolunteersAction,
  getVolunteerAction,
} from '@store/volunteers-store/actions';
import {
  selectVolunteersData,
  selectIsLoading,
  selectVolunteersDetails,
  selectError,
  selectVolunteersCount,
} from '@store/volunteers-store/selectors';
import { IVolunteer } from '@models/volunteers';
import { PageEvent } from '@angular/material/paginator';

export type VolunteerPageParams = { pageSize: number; pageIndex: number };

@Injectable({
  providedIn: 'root',
})
export class VolunteersFacadeService {
  volunteers$ = this.store.pipe(select(selectVolunteersData));
  volunteerDetails$ = this.store.pipe(select(selectVolunteersDetails));
  count$ = this.store.pipe(select(selectVolunteersCount));
  isLoading$ = this.store.pipe(select(selectIsLoading));
  error$ = this.store.pipe(select(selectError));
  constructor(private store: Store<RootState>) {}

  saveVolunteer(volunteer: IVolunteer) {
    if (volunteer._id) {
      this.store.dispatch(updateVolunteerAction({ payload: volunteer }));
    } else {
      this.store.dispatch(saveVolunteerAction({ payload: volunteer }));
    }
  }

  getVolunteers(page: VolunteerPageParams, filters?: any) {
    this.store.dispatch(getVolunteersAction({ page, filters }));
  }

  getVolunteerById(id: string) {
    this.store.dispatch(getVolunteerAction({ id }));
  }

  getVolunteersByFilter(criteria: { [keys: string]: string }) {
    this.store.dispatch(getVolunteersByFilterAction({ payload: criteria }));
  }
}
