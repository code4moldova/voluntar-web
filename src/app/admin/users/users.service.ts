import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './shared/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UsersListRequest } from '@users/shared/users-list-request';
import { UsersListResponse } from '@users/shared/users-list-response';
import { map } from 'rxjs/operators';
import { UserRole, UserRolePriority } from '@users/shared/user-role';
import { oldToNewRolesMap } from '@users/shared/old-to-new-roles-map';

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

  getList(
    filter: UsersListRequest = { page: 0, per_page: 10 }
  ): Observable<UsersListResponse> {
    const { page, per_page, ...params } = filter;
    const url = `${environment.url}/operator/filters/${page + 1}/${per_page}`;
    return this.http
      .get<UsersListResponse>(url, {
        params: JSON.parse(JSON.stringify(params)),
      })
      .pipe(
        map((response) => ({
          ...response,
          list: response.list.map(userRoleMergeMapSort),
        }))
      );
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.url}/operator?id=${id}`);
  }
}

/**
 * This function will merge deprecated `role` field
 * Will change deprecated roles with new ones
 * Will sort roles by priority
 */
function userRoleMergeMapSort(user: User): User {
  const mergedRoles = [...(user.role ?? []), ...(user.roles ?? [])];
  const remappedUniqueRoles = [...new Set(oldToNewRolesMap(mergedRoles))];
  const sortedRolesByPriority = remappedUniqueRoles.sort(
    (a, b) => UserRolePriority.indexOf(a) - UserRolePriority.indexOf(b)
  );
  return {
    ...user,
    role: undefined,
    roles: sortedRolesByPriority,
  };
}
