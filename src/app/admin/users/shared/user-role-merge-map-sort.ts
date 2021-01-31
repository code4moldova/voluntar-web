import { User } from '@users/shared/user';
import { oldToNewRolesMap } from '@users/shared/old-to-new-roles-map';
import { UserRolePriority } from '@users/shared/user-role';

/**
 * This function will merge deprecated `role` field
 * Will change deprecated roles with new ones
 * Will sort roles by priority
 */
export function userRoleMergeMapSort(user: User): User {
  const mergedRoles = [...(user.role ?? []), ...(user.roles ?? [])];
  const remappedUniqueRoles = [...new Set(oldToNewRolesMap(mergedRoles))];
  const sortedRolesByPriority = remappedUniqueRoles.sort(
    (a, b) => UserRolePriority.indexOf(a) - UserRolePriority.indexOf(b),
  );
  return {
    ...user,
    role: undefined,
    roles: sortedRolesByPriority,
  };
}
