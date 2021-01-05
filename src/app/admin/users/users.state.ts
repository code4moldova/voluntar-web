import { User } from './shared/user';

export interface UsersState {
  data: User[];
  userDetails: User;
  isLoading: boolean;
  error: string;
}

export const initialState: UsersState = {
  data: [],
  userDetails: null,
  isLoading: false,
  error: null,
};
