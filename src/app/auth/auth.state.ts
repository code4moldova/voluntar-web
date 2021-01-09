import { User } from '@users/shared/user';

export interface AuthState {
  token: {
    accessToken: string;
    refreshToken?: string;
  };
  userData: User;
  isLoading: boolean;
  error: string;
}

export const initialState: AuthState = {
  token: null,
  isLoading: false,
  userData: null,
  error: null,
};
