import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRequest, IRequestDetails, BeneficiaryCriteriaFilter } from '@models/requests';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private http: HttpClient) {}

  getRequests() {
    return this.http.get<{ count: number; list: IRequestDetails[] }>(
      `${environment.url}/api/beneficiary/filters/1/1000`
    );
  }

  getRequstById(id: string) {
    return this.http.get<IRequestDetails>(
      `${environment.url}/api/beneficiary?id=${id}`
    );
  }

  saveRequest(request: IRequest) {
    return this.http.post<any>(`${environment.url}/api/beneficiary`, request);
  }

  updateRequest(request: IRequestDetails) {
    return this.http.put<any>(
      `${environment.url}/api/beneficiary?id=${request._id}`,
      request
    );
  }

  getBeneficiariesByFilter(criteria: BeneficiaryCriteriaFilter): Observable<{ count: number, list: IRequestDetails[] }> {
    return this.http.get<{ count: number, list: IRequestDetails[] }>(`${environment.url}/api/beneficiary/filters/1/1000?${criteria.field}=${criteria.value}&volunteer__ne=''`);
  }

}
