import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenStorage {
  private token$: BehaviorSubject<any> = new BehaviorSubject(null);
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private parsedToken$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    this.parseToken();
    this.token$.next(localStorage.getItem('accessToken'));
  }

  public getAccessToken(): Observable<string> {
    return this.token$.asObservable();
  }
  public getParsedToken(): Observable<any> {
    return this.parsedToken$.asObservable();
  }

  // public getRefreshToken(): Observable<string> {
  //   const token: string = localStorage.getItem('refreshToken');
  //   return of(token);
  // }

  public setAccessToken(token: string): TokenStorage {
    localStorage.setItem('accessToken', token);
    this.token$.next(token);
    this.parseToken();
    return this;
  }

  public setRefreshToken(token: string): TokenStorage {
    localStorage.setItem('refreshToken', token);
    return this;
  }

  private parseToken() {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const decodedToken = this.jwtHelper.decodeToken(accessToken);
        this.parsedToken$.next(decodedToken);
      }
    } catch (error) {
      this.clear();
    }
  }

  public clear() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.token$.next(null);
  }
}
