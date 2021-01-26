//Additional services for testing map component purpose
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from 'src/environments/environment';
import { Demand } from '@app/shared/models/demand';

@Injectable({
  providedIn: 'root',
})
export class DemandsMapService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  tempSetStatusToConfirmed(el: Demand) {
    return this.http.put<any>(`${environment.url}/requests`, {
      _id: el._id,
      status: 'confirmed',
    });
  }

  assignDemandsToVolunteer(volunteerId: string = '', demands: Demand[] = []) {
    const bodyObj = {
      volunteer: `${volunteerId}`,
      request_list: demands.map((demand) => demand._id),
    };
    return this.http.post<any>(`${environment.url}/clusters`, bodyObj);
  }

  getDemandsFromDB(
    page: { pageIndex: number; pageSize: number } = {
      pageIndex: 1,
      pageSize: 20000,
    },
    filters: any = {}
  ) {
    const params = new HttpParams({ fromObject: filters });
    return this.http.get<{ count: number; list: Demand[] }>(
      `${environment.url}/requests/filters/${page.pageIndex || 1}/${
        page.pageSize || 1000
      }`,
      { params }
    );
  }
}
