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

export const UserRolePriority = [
  UserRole.administrator,
  UserRole.coordinator,
  UserRole.operator,
];
