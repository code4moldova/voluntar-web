import { Injectable } from '@angular/core';
import {
  saveVolunteerAction,
  updateVolunteerAction,
  getVolunteersByFilterAction,
  getVolunteerDemandsAction,
} from './volunteers.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/app.state';
import { getVolunteersAction, getVolunteerAction } from './volunteers.actions';
import {
  selectVolunteersData,
  selectIsLoading,
  selectVolunteersCount,
  selectDemandsData,
  selectDemandsCount,
} from './volunteers.selectors';
import { Volunteer } from './shared/volunteer';
import { VolunteersService } from './volunteers.service';
import { PageParams } from '@app/admin/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class VolunteersFacade {
  volunteers$ = this.store.pipe(select(selectVolunteersData));

  count$ = this.store.pipe(select(selectVolunteersCount));
  isLoading$ = this.store.pipe(select(selectIsLoading));
  demandsData$ = this.store.pipe(select(selectDemandsData));
  demandsCount$ = this.store.pipe(select(selectDemandsCount));

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

  getVolunteers(page: PageParams, filters?: any) {
    this.store.dispatch(getVolunteersAction({ page, filters }));
  }

  getVolunteerById(id: string) {
    this.store.dispatch(getVolunteerAction({ id }));
  }

  getVolunteersByFilter(criteria: { [keys: string]: string }) {
    this.store.dispatch(getVolunteersByFilterAction({ payload: criteria }));
  }

  getByStatus(status?: string) {
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

  getVolunteerDemands(
    page: { pageSize: number; pageIndex: number },
    id: string,
  ) {
    this.store.dispatch(getVolunteerDemandsAction({ page, id }));
  }
}
