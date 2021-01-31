import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '@app/app.state';
import { loginAction, logoutAction } from './auth.actions';
import { selectIsLoading } from './auth.selectors';
import { filter, map, pluck } from 'rxjs/operators';
import { TokenStorage } from '@shared/token-storage.service';
import { AuthCredentials } from './shared/auth-credentials';
import { oldToNewRolesMap } from '@users/shared/old-to-new-roles-map';
import { User } from '@users/shared/user';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  userData$ = this.tokenStorage.getParsedToken();
  userRoles$ = this.tokenStorage.getParsedToken().pipe(
    filter((user: User) => Boolean(user)),
    pluck('roles'),
    map(oldToNewRolesMap),
  );
  isLoading$ = this.store.pipe(select(selectIsLoading));

  constructor(
    private store: Store<AppState>,
    private tokenStorage: TokenStorage,
  ) {}

  loginUser(credentials: AuthCredentials) {
    this.store.dispatch(loginAction(credentials));
  }

  logout() {
    this.store.dispatch(logoutAction());
  }
}
