import { User } from './user';

export interface UsersState {
  data: User[];
  userDetails: User;
  isLoading: boolean;
  error: string;
}
