import { Injectable } from '@angular/core';
import { saveVolunteerAction } from '@store/volunteers-store/actions';
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
  constructor(private store: Store<RootState>) {}

  saveVolunteer(volunteer: IVolunteer) {
    this.store.dispatch(saveVolunteerAction({ payload: volunteer }));
  }

  getVolunteers() {
    this.store.dispatch(getVolunteersAction());
  }

  getVolunteerById(id: number) {
    this.store.dispatch(getVolunteerAction({ id }));
  }
}
