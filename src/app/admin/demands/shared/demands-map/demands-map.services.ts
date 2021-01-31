//Additional services for testing map component purpose
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Demand } from '@app/shared/models/demand';

@Injectable({
  providedIn: 'root',
})
export class DemandsMapService {
  constructor(private http: HttpClient) {}

  assignDemandsToVolunteer(volunteerId: string = '', demands: Demand[] = []) {
    return this.http.post<any>(`${environment.url}/clusters`, {
      volunteer: `${volunteerId}`,
      request_list: demands.map((demand) => demand._id),
    });
  }
}
