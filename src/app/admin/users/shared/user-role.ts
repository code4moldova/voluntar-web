export enum UserRole {
  administrator = 'administrator',
  coordinator = 'coordinator',
  operator = 'operator',
  /** @deprecated */
  admin = 'admin',
  /** @deprecated */
  fixer = 'fixer',
}

export const userRoles = Object.values(UserRole);

export function filterDeprecatedUserRoles(roles: UserRole[]) {
  return roles.filter(
    // Filter deprecated roles
    (role) => ![UserRole.fixer, UserRole.admin].includes(role),
  );
}

export const UserRolePriority = [
  UserRole.administrator,
  UserRole.coordinator,
  UserRole.operator,
];
