export interface UserState {
  token: {
    accessToken: string;
    refreshToken?: string;
  };
  isLoading: boolean;
  error: string;
}

export const initialState: UserState = {
  token: null,
  isLoading: false,
  error: null
};
