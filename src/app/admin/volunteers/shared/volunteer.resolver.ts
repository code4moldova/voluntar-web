import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { VolunteersService } from '../volunteers.service';
import { Volunteer } from '../shared/volunteer';

@Injectable({
  providedIn: 'root',
})
export class VolunteerResolver implements Resolve<Volunteer> {
  constructor(private volunteersService: VolunteersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Volunteer> {
    return this.volunteersService.getVolunteerById(route.paramMap.get('id'));
  }
}
