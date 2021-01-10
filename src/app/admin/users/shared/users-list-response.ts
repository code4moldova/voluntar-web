import { User } from '@users/shared/user';

export type UsersListResponse = {
  list: User[];
  count: number;
};
