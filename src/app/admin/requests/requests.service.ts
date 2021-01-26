import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IRequest, IRequestDetails } from '@shared/models';
import { environment } from 'src/environments/environment';
import { Demand } from '@app/shared/models/demand';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private http: HttpClient) {}

  getRequests(
    page: { pageIndex: number; pageSize: number } = {
      pageIndex: 1,
      pageSize: 20,
    },
    filters: any = {}
  ) {
    const params = new HttpParams({ fromObject: filters });
    return this.http.get<{ count: number; list: IRequestDetails[] }>(
      `${environment.url}/beneficiary/filters/${page.pageIndex || 1}/${
        page.pageSize || 1000
      }`,
      { params }
    );
  }

  getDemand(
    page: { pageIndex: number; pageSize: number } = {
      pageIndex: 1,
      pageSize: 20,
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

  getRequstById(id: string) {
    return this.http.get<IRequestDetails>(
      `${environment.url}/beneficiary?id=${id}`
    );
  }

  saveRequest(request: IRequest) {
    return this.http.post<any>(`${environment.url}/beneficiary`, request);
  }

  updateRequest(request: IRequestDetails) {
    return this.http.put<any>(
      `${environment.url}/beneficiary?id=${request._id}`,
      request
    );
  }

  exportRequests() {
    return this.http.get(`${environment.url}/export/csv/beneficiaries`, {
      responseType: 'blob',
    });
  }

  // getBeneficiariesByFilter(httpParams: { [keys: string]: string }): Observable<{ count: number; list: IRequestDetails[] }> {
  //   const params = new HttpParams({ fromObject: httpParams });
  //   return this.http.get<{ count: number; list: IRequestDetails[] }>(
  //     `${environment.url}/beneficiary/filters/1/1000?`, { params },
  //   );
  // }
}
