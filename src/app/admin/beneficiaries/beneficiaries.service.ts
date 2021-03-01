import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Beneficiary } from './shared/beneficiary';
import { environment } from 'src/environments/environment';
import { Demand } from '@demands/shared/demand';

@Injectable({
  providedIn: 'root',
})
export class BeneficiariesService {
  constructor(private http: HttpClient) {}

  saveBeneficiary(beneficiary: Beneficiary) {
    return this.http.post<any>(`${environment.url}/beneficiary`, beneficiary);
  }

  updateBeneficiary(beneficiary: Beneficiary) {
    return this.http.put<any>(
      `${environment.url}/beneficiary?id=${beneficiary._id}`,
      beneficiary,
    );
  }

  getBeneficiaries(
    page: { pageIndex: number; pageSize: number } = {
      pageIndex: 1,
      pageSize: 20,
    },
    filters: any = {},
  ) {
    const params = new HttpParams({ fromObject: filters });
    return this.http.get<{ list: Beneficiary[]; count: number }>(
      `${environment.url}/beneficiary/filters/${page.pageIndex || 1}/${
        page.pageSize || 1000
      }`,
      { params },
    );
  }

  getBeneficiaryById(id: string): Observable<Beneficiary> {
    return this.http.get<Beneficiary>(
      `${environment.url}/beneficiary?id=${id}`,
    );
  }

  getBeneficiariesByFilter(
    httpParams: { [key: string]: string } = {},
  ): Observable<{ count: number; list: Beneficiary[] }> {
    const params = new HttpParams({ fromObject: httpParams });
    return this.http.get<{ count: number; list: Beneficiary[] }>(
      `${environment.url}/beneficiary/filters/1/1000?`,
      {
        params,
      },
    );
  }

  getBeneficiariesByFilterPaged(
    page: { pageIndex: number; pageSize: number } = {
      pageIndex: 1,
      pageSize: 20,
    },
    httpParams: { [key: string]: string } = {},
  ): Observable<{ count: number; list: Beneficiary[] }> {
    const params = new HttpParams({ fromObject: httpParams });
    return this.http.get<{ count: number; list: Beneficiary[] }>(
      `${environment.url}/beneficiary/filters/${page.pageIndex}/${page.pageSize}`,
      {
        params,
      },
    );
  }

  getBeneficiaryDemands(
    page: { pageIndex: number; pageSize: number } = {
      pageIndex: 1,
      pageSize: 20,
    },
    id: string,
  ) {
    const params = new HttpParams({ fromObject: { b_id: id } });
    return this.http.get<{ list: Demand[]; count: number }>(
      `${environment.url}/requests/filters/${page.pageIndex || 1}/${
        page.pageSize
      }`,
      { params },
    );
  }
}
