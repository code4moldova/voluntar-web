import { Injectable } from '@angular/core';
import {
  saveVolunteerAction,
  updateVolunteerAction,
  getVolunteersByFilterAction,
} from './volunteers.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/app.state';
import { getVolunteersAction, getVolunteerAction } from './volunteers.actions';
import {
  selectVolunteersData,
  selectIsLoading,
  selectVolunteersCount,
} from './volunteers.selectors';
import { Volunteer } from './shared/volunteer';
import { VolunteersService } from './volunteers.service';

export type VolunteerPageParams = { pageSize: number; pageIndex: number };

@Injectable({
  providedIn: 'root',
})
export class VolunteersFacade {
  volunteers$ = this.store.pipe(select(selectVolunteersData));

  count$ = this.store.pipe(select(selectVolunteersCount));
  isLoading$ = this.store.pipe(select(selectIsLoading));

  constructor(
    private store: Store<AppState>,
    private volunteerService: VolunteersService,
  ) {}

  saveVolunteer(volunteer: Volunteer) {
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

  getByStatus(status: string) {
    const page = {
      pageIndex: 0,
      pageSize: 1,
    };
    const filters = status
      ? {
          status,
        }
      : {};
    return this.volunteerService.getVolunteers(page, filters);
  }
}
