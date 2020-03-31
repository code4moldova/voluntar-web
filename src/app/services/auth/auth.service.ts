import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { AuthCredentials } from '@models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: AuthCredentials) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Basic ' + btoa(`${credentials.login}:${credentials.password}`)
    });
    return this.http.get<{ token: string }>(`${environment.url}/api/token`, {
      headers
    });
  }
}
