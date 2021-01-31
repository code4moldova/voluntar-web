import { UserRole } from '@users/shared/user-role';

export function oldToNewRolesMap(roles: UserRole[]): UserRole[] {
  return roles.map((role) =>
    role === UserRole.admin
      ? UserRole.administrator
      : role === UserRole.fixer
      ? UserRole.coordinator
      : role,
  );
}
