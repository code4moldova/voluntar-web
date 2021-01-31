import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '@app/app.state';
import { selectIsLoading, selectUsersList } from './users.selectors';
import {
  createUserAction,
  getUserDetailsAction,
  getUsersAction,
  updateUserAction,
} from './users.actions';
import { User } from './shared/user';
import { UsersListRequest } from '@users/shared/users-list-request';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  isLoading$ = this.store.pipe(select(selectIsLoading));

  users$ = this.store.pipe(select(selectUsersList));
  constructor(private store: Store<AppState>) {}

  saveUser(user: User) {
    if (user._id) {
      this.store.dispatch(updateUserAction({ payload: user }));
    } else {
      this.store.dispatch(createUserAction({ payload: user }));
    }
  }

  getUsers(filter?: UsersListRequest) {
    this.store.dispatch(getUsersAction({ payload: filter }));
  }

  getUserById(id: string) {
    this.store.dispatch(getUserDetailsAction({ id }));
  }
}
