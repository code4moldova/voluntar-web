import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { User } from '@users/shared/user';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UsersService } from '@users/users.service';
import { map } from 'rxjs/operators';
import { userRoleMergeMapSort } from './user-role-merge-map-sort';

@Injectable({
  providedIn: 'root',
})
export class UserResolverService implements Resolve<User> {
  constructor(private usersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.usersService
      .getById(route.paramMap.get('id'))
      .pipe(map(userRoleMergeMapSort));
  }
}
