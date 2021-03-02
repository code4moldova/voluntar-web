import { UserRole } from '@users/shared/user-role';

export type UsersListRequest = {
  page: number;
  per_page: number;
  is_active?: boolean;
  // TODO: investigate why backend receives a value, but is named as array
  roles?: UserRole;
  query?: string;
};
