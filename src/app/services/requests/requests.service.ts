import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { data } from './mock';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IRequest } from '@models/requests';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  constructor(private http: HttpClient) {}

  getRequests(): Observable<IRequest[]> {
    return of(data).pipe(delay(1000));
  }
}
