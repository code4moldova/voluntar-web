import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { data } from './mock';
import { of, Observable } from 'rxjs';
import { IVolunteer } from '@models/volunteers';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VolunteersService {
  constructor(private http: HttpClient) { }

  saveVolunteer(volunteer: IVolunteer) {
    return of<any>({ success: true });
    return this.http.post('', volunteer);
  }

  getVolunteers(): Observable<IVolunteer[]> {
    return of(data).pipe(delay(1000));
  }
}
