import { IUser } from '@models/user';

export interface UsersState {
  data: IUser[];
  userDetails: IUser;
  isLoading: boolean;
  error: string;
}

export const initialState: UsersState = {
  data: [],
  userDetails: null,
  isLoading: false,
  error: null,
};
