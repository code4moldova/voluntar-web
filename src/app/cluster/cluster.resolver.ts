import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClusterResolver implements Resolve<unknown> {
  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot): Observable<unknown> {
    const clusterId = route.paramMap.get('id');
    return this.http.get(`${environment.url}/cluster/${clusterId}`);
  }
}
