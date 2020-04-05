import { Injectable } from '@angular/core';
import {
  saveVolunteerAction,
  updateVolunteerAction,
  getVolunteersByFilterAction
} from '@store/volunteers-store/actions';
import { Store, select } from '@ngrx/store';
import { RootState } from '@store/root-state';
import {
  getVolunteersAction,
  getVolunteerAction
} from '@store/volunteers-store/actions';
import {
  selectVolunteersData,
  selectIsLoading,
  selectVolunteersDetails,
  selectError
} from '@store/volunteers-store/selectors';
import { IVolunteer } from '@models/volunteers';

@Injectable({
  providedIn: 'root'
})
export class VolunteersFacadeService {
  volunteers$ = this.store.pipe(select(selectVolunteersData));
  volunteerDetails$ = this.store.pipe(select(selectVolunteersDetails));
  isLoading$ = this.store.pipe(select(selectIsLoading));
  error$ = this.store.pipe(select(selectError));
  constructor(private store: Store<RootState>) { }

  saveVolunteer(volunteer: IVolunteer) {
    if (volunteer._id) {
      this.store.dispatch(updateVolunteerAction({ payload: volunteer }));
    } else {
      this.store.dispatch(saveVolunteerAction({ payload: volunteer }));
    }
  }

  getVolunteers() {
    this.store.dispatch(getVolunteersAction());
  }

  getVolunteerById(id: string) {
    this.store.dispatch(getVolunteerAction({ id }));
  }

  getVolunteerByFilter(criteria: string) {
    this.store.dispatch(getVolunteersByFilterAction({ payload: criteria }));
  }

}
