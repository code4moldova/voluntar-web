import { IUser } from '@models/user';

export interface AuthState {
  token: {
    accessToken: string;
    refreshToken?: string;
  };
  userData: IUser;
  isLoading: boolean;
  error: string;
}

export const initialState: AuthState = {
  token: null,
  isLoading: false,
  userData: null,
  error: null
};
