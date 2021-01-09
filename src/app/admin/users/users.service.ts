import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './shared/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  save(user: User) {
    return this.http.post<{ user: User }>(`${environment.url}/operator`, user);
  }

  update(user: User) {
    return this.http.put<any>(
      `${environment.url}/operator?id=${user._id}`,
      user
    );
  }

  getList(): Observable<{ list: User[] }> {
    return this.http.get<{ list: User[] }>(`${environment.url}/operator`);
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.url}/operator?id=${id}`);
  }
}
