import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootState } from 'src/app/root-store/root-state';
import { loginAction, logoutAction } from '@store/auth-store/actions';
import { AuthCredentials } from 'src/app/models/user';
import { selectAuthUserData } from '@store/auth-store/selectors';
import { map, filter } from 'rxjs/operators';
import { TokenStorage } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {
  userData$ = this.store.pipe(select(selectAuthUserData));
  userRoles$ = this.tokenStorage.getParsedToken().pipe(
    filter(user => Boolean(user)),
    map(user => user.roles)
  );
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
