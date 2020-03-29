import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { data } from './mock';
import { of, Observable, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IRequest } from '@models/requests';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  constructor(private http: HttpClient) { }

  getRequests(): Observable<IRequest[]> {
    return of(data).pipe(delay(1000));
  }

  getRequstById(id: number) {
    const request = data.find(r => r.id === id);
    if (request) {
      return of(request).pipe(delay(1000));
    }

    return throwError('Coudn\'t find Request');
  }

  saveRequest(request: IRequest) {
    return of(request).pipe(delay(1000));
  }
}
