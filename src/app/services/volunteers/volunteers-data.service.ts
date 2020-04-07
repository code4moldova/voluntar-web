import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { IVolunteer } from '@models/volunteers';

@Injectable({
  providedIn: 'root',
})
export class VolunteersDataService extends EntityCollectionServiceBase<
  IVolunteer
> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('volunteer', serviceElementsFactory);
  }
}
