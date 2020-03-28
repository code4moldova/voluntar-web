import { Injectable } from '@angular/core';
import { Volunteer } from '@models/volunteer';
import { VolunteersState } from '@store/volunteers-store/state';
import { Store } from '@ngrx/store';
import { saveVolunteerAction } from '@store/volunteers-store/actions';

@Injectable({
  providedIn: 'root'
})
export class VolunteersFacadeService {

  constructor(private store: Store<VolunteersState>) { }

  createNewVolunteer(volunteer: Volunteer) {
    this.store.dispatch(saveVolunteerAction(volunteer));
  }
}
