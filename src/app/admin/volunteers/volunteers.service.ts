import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Volunteer } from './shared/volunteer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VolunteersService {
  constructor(private http: HttpClient) {}

  saveVolunteer(volunteer: Volunteer) {
    return this.http.post<any>(`${environment.url}/volunteer`, volunteer);
  }

  updateVolunteer(volunteer: Volunteer) {
    return this.http.put<any>(
      `${environment.url}/volunteer?id=${volunteer._id}`,
      volunteer,
    );
  }

  getVolunteers(
    page: { pageIndex: number; pageSize: number } = {
      pageIndex: 1,
      pageSize: 20,
    },
    filters: any = {},
  ) {
    return this.http.get<{ list: Volunteer[]; count: number }>(
      `${environment.url}/volunteer/filters/${page.pageIndex || 1}/${
        page.pageSize || 1000
      }`,
      {
        params: new HttpParams({
          fromObject: JSON.parse(JSON.stringify(filters)),
        }),
      },
    );
  }

  getVolunteerById(id: string): Observable<Volunteer> {
    return this.http.get<Volunteer>(`${environment.url}/volunteer?id=${id}`);
  }

  getVolunteersByFilter(
    httpParams: { [key: string]: string } = {},
  ): Observable<{ count: number; list: Volunteer[] }> {
    const params = new HttpParams({ fromObject: httpParams });
    return this.http.get<{ count: number; list: Volunteer[] }>(
      `${environment.url}/volunteer/filters/1/1000?`,
      {
        params,
      },
    );
  }
}
