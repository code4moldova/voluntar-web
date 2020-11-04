import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootState } from '@store/root-state';
import { loginAction, logoutAction } from './auth.actions';
import { AuthCredentials } from '@models/user';
import { selectIsLoading } from './auth.selectors';
import { map, filter } from 'rxjs/operators';
import { TokenStorage } from '@shared/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  userData$ = this.tokenStorage.getParsedToken();
  userRoles$ = this.tokenStorage.getParsedToken().pipe(
    filter((user) => Boolean(user)),
    map((user) => {
      return user.roles;
    })
  );
  isLoading$ = this.store.pipe(select(selectIsLoading));
  constructor(
    private store: Store<RootState>,
    private tokenStorage: TokenStorage
  ) {}

  loginUser(credentials: AuthCredentials) {
    this.store.dispatch(loginAction(credentials));
  }

  logout() {
    this.store.dispatch(logoutAction());
  }
}
