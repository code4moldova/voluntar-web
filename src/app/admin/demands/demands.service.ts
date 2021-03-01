import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Demand } from '@demands/shared/demand';

@Injectable({
  providedIn: 'root',
})
export class DemandsService {
  constructor(private http: HttpClient) {}

  getDemands(
    page: { pageIndex: number; pageSize: number } = {
      pageIndex: 1,
      pageSize: 20,
    },
    filters: any = {},
  ) {
    const nonUndefinedFilters = Object.fromEntries(
      Object.entries<string>(filters).filter(
        ([, value]) => value !== undefined,
      ),
    );
    const params = new HttpParams({ fromObject: nonUndefinedFilters });
    return this.http.get<{ count: number; list: Demand[] }>(
      `${environment.url}/requests/filters/${page.pageIndex || 1}/${
        page.pageSize || 1000
      }`,
      { params },
    );
  }

  getDemand(id: string) {
    return this.http.get<Demand>(`${environment.url}/requests/${id}`);
  }

  saveDemand(demand: Demand) {
    return this.http.post<any>(`${environment.url}/requests`, demand);
  }

  updateDemand(demand: Demand) {
    return this.http.put<any>(`${environment.url}/requests`, demand);
  }

  assignToVolunteer(demands: Demand[] = [], volunteerId: string) {
    return this.http.post<any>(`${environment.url}/clusters`, {
      volunteer: `${volunteerId}`,
      request_list: demands.map((demand) => demand._id),
    });
  }
}
