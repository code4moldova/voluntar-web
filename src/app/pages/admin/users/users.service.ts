import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '@models/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  save(user: IUser) {
    return this.http.post<{ user: IUser }>(`${environment.url}/operator`, user);
  }

  update(user: IUser) {
    return this.http.put<any>(
      `${environment.url}/operator?id=${user._id}`,
      user
    );
  }

  getList(): Observable<{ list: IUser[] }> {
    return this.http.get<{ list: IUser[] }>(`${environment.url}/operator`);
  }

  getById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${environment.url}/operator?id=${id}`);
  }
}
