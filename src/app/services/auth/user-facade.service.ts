import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store/root-state';
import {
  loginAction,
  logoutAction
} from 'src/app/root-store/user-store/actions';
import { AuthCredentials } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {
  constructor(private store: Store<RootState>) {}

  loginUser(credentials: AuthCredentials) {
    this.store.dispatch(loginAction(credentials));
  }

  logout() {
    this.store.dispatch(logoutAction());
  }
}
