import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthCredentials } from '@shared/models';
import { environment } from 'src/environments/environment';
import { TokenStorage } from '@shared/token-storage.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {}

  login(credentials: AuthCredentials) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Basic ' + btoa(`${credentials.login}:${credentials.password}`),
    });
    return this.http.get<{ token: string }>(`${environment.url}/token`, {
      headers,
    });
  }

  isAuthorized() {
    return this.tokenStorage
      .getAccessToken()
      .pipe(map((token) => Boolean(token)));
  }
}
