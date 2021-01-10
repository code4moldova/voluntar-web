import { User } from './user';
import { UsersListResponse } from '@users/shared/users-list-response';

export interface UsersState {
  data: UsersListResponse;
  userDetails: User;
  isLoading: boolean;
  error: string;
}
