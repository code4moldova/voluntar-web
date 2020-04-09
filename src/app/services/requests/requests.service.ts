import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRequest, IRequestDetails } from '@models/requests';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private http: HttpClient) { }

  getRequests() {
    return this.http.get<{ count: number; list: IRequestDetails[] }>(
      `${environment.url}/beneficiary/filters/1/1000`
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

  getBeneficiariesByFilter(httpParams: { [keys: string]: string }): Observable<{ count: number; list: IRequestDetails[] }> {
    const params = new HttpParams({ fromObject: httpParams });
    return this.http.get<{ count: number; list: IRequestDetails[] }>(
      `${environment.url}/beneficiary/filters/1/1000?`, { params },
    );
  }

}
