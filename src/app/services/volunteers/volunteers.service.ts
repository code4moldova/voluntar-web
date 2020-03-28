import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Volunteer } from '@models/volunteer';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolunteersService {
  constructor(private http: HttpClient) { }

  saveVolunteer(volunteer: Volunteer) {
    return of<any>({ success: true });
    return this.http.post('', volunteer);
  }
}
