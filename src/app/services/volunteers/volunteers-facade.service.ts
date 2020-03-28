import { Injectable } from '@angular/core';
import { Volunteer } from '@models/volunteer';
import { VolunteersState } from '@store/volunteers-store/state';
import { saveVolunteerAction } from '@store/volunteers-store/actions';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootState } from '@store/root-state';
import { getVolunteersAction } from '@store/volunteers-store/actions';
import {
  selectVolunteersData,
  selectIsLoading
} from '@store/volunteers-store/selectors';

@Injectable({
  providedIn: 'root'
})
export class VolunteersFacadeService {
  volunteers$ = this.store.pipe(select(selectVolunteersData));
  isLoading$ = this.store.pipe(select(selectIsLoading));
  constructor(private store: Store<RootState>) {}

  createNewVolunteer(volunteer: Volunteer) {
    this.store.dispatch(saveVolunteerAction(volunteer));
  }

  getVolunteers() {
    this.store.dispatch(getVolunteersAction());
  }
}
