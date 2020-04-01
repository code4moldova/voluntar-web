import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootState } from '@store/root-state';
import {
  selectIsLoading,
  selectUserDetails,
  selectUsersList
} from '@store/users-store/selectors';
import {
  getUserDetailsAction,
  getUsersAction,
  updateUserAction,
  createUserAction
} from '@store/users-store/actions';
import { IUser } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersFacadeService {
  isLoading$ = this.store.pipe(select(selectIsLoading));
  userDetails$ = this.store.pipe(select(selectUserDetails));
  users$ = this.store.pipe(select(selectUsersList));
  constructor(private store: Store<RootState>) {}

  saveUser(user: IUser) {
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
