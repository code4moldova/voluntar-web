import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/app.state';
import {
  selectIsLoading,
  selectUserDetails,
  selectUsersList,
} from './users.selectors';
import {
  getUserDetailsAction,
  getUsersAction,
  updateUserAction,
  createUserAction,
} from './users.actions';
import { User } from './shared/user';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  isLoading$ = this.store.pipe(select(selectIsLoading));
  userDetails$ = this.store.pipe(select(selectUserDetails));
  users$ = this.store.pipe(select(selectUsersList));
  constructor(private store: Store<AppState>) {}

  saveUser(user: User) {
    if (user._id) {
      this.store.dispatch(updateUserAction({ payload: user }));
    } else {
      this.store.dispatch(createUserAction({ payload: user }));
    }
  }

  getUsers() {
    this.store.dispatch(getUsersAction());
  }

  getUserById(id: string) {
    this.store.dispatch(getUserDetailsAction({ id }));
  }
}
