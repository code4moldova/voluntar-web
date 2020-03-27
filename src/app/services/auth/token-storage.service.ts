import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenStorage {
  private token$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    this.token$.next(localStorage.getItem('accessToken'));
  }

  public getAccessToken(): Observable<string> {
    const token: string = localStorage.getItem('accessToken');
    return of(token);
  }

  public getRefreshToken(): Observable<string> {
    const token: string = localStorage.getItem('refreshToken');
    return of(token);
  }

  public setAccessToken(token: string): TokenStorage {
    localStorage.setItem('accessToken', token);
    this.token$.next(token);
    return this;
  }

  public setRefreshToken(token: string): TokenStorage {
    localStorage.setItem('refreshToken', token);
    return this;
  }

  public clear() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.token$.next(null);
  }
}
