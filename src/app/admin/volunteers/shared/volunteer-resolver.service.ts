import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { VolunteersService } from '@volunteers/volunteers.service';
import { IVolunteer } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class VolunteerResolverService implements Resolve<IVolunteer> {
  constructor(private volunteersService: VolunteersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVolunteer> {
    return this.volunteersService.getVolunteerById(route.paramMap.get('id'));
  }
}
