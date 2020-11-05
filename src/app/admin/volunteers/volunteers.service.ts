import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVolunteer } from '@shared/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VolunteersService {
  constructor(private http: HttpClient) {}

  saveVolunteer(volunteer: IVolunteer) {
    return this.http.post<any>(`${environment.url}/volunteer`, volunteer);
  }

  updateVolunteer(volunteer: IVolunteer) {
    return this.http.put<any>(
      `${environment.url}/volunteer?id=${volunteer._id}`,
      volunteer
    );
  }

  getVolunteers(
    page: { pageIndex: number; pageSize: number } = {
      pageIndex: 1,
      pageSize: 20,
    },
    filters: any = {}
  ) {
    const params = new HttpParams({ fromObject: filters });
    return this.http.get<{ list: IVolunteer[]; count: number }>(
      `${environment.url}/volunteer/filters/${page.pageIndex || 1}/${
        page.pageSize || 1000
      }`,
      { params }
    );
  }

  getVolunteerById(id: string): Observable<IVolunteer> {
    return this.http.get<IVolunteer>(`${environment.url}/volunteer?id=${id}`);
  }

  getVolunteersNearbyRequest(requestId: string, volunteers = 10) {
    return this.http.get<{ list: IVolunteer[] }>(
      `${environment.url}/volunteer/closest/${requestId}/${volunteers}`
    );
  }

  getVolunteersByFilter(
    httpParams: { [key: string]: string } = {}
  ): Observable<{ count: number; list: IVolunteer[] }> {
    const params = new HttpParams({ fromObject: httpParams });
    return this.http.get<{ count: number; list: IVolunteer[] }>(
      `${environment.url}/volunteer/filters/1/1000?`,
      {
        params,
      }
    );
  }
}
