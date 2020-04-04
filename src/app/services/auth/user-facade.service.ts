import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootState } from 'src/app/root-store/root-state';
import { loginAction, logoutAction } from '@store/auth-store/actions';
import { AuthCredentials } from 'src/app/models/user';
import { selectIsLoading } from '@store/auth-store/selectors';
import { map, filter } from 'rxjs/operators';
import { TokenStorage } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserFacadeService {
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
