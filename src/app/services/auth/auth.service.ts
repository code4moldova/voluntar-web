import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { AuthCredentials } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: AuthCredentials) {
    return of<any>({ accessToken: 'token', refreshToken: 'refreshToken' });
    return this.http.post('', credentials);
  }
}
