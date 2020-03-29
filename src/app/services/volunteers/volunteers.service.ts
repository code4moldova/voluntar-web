import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { data } from './mock';
import { of, Observable, throwError } from 'rxjs';
import { IVolunteer } from '@models/volunteers';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VolunteersService {
  constructor(private http: HttpClient) { }

  saveVolunteer(volunteer: IVolunteer) {
    return of<any>({ success: true }).pipe(delay(1000));
    // return this.http.post('', volunteer);
  }

  getVolunteers(): Observable<IVolunteer[]> {
    return of(data).pipe(delay(1000));
  }

  getVolunteerById(id: number): Observable<IVolunteer> {
    const volunteerById = data.find(v => v.id === id);
    if (volunteerById) {
      return of(volunteerById).pipe(delay(1000));
    }

    return throwError('Coudn\'t find Volunteer');
  }
}
