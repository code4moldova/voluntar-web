import { Injectable } from '@angular/core';
import { UserRole } from '@users/shared/user-role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  static ACCESS_CONFIG = {
    users: [
      UserRole.administrator,
      // TODO: to remove these are deprecated
      UserRole.admin,
    ],
    requests: [
      UserRole.administrator,
      UserRole.operator,
      UserRole.coordinator,
      // TODO: to remove these are deprecated
      UserRole.fixer,
      UserRole.admin,
    ],
    beneficiaries: [
      UserRole.administrator,
      UserRole.coordinator,
      // TODO: to remove these are deprecated
      UserRole.admin,
    ],
    volunteers: [
      UserRole.administrator,
      UserRole.coordinator,
      // TODO: to remove these are deprecated
      UserRole.admin,
    ],
  };

  static getPageRoles(
    item: keyof typeof RoleService.ACCESS_CONFIG
  ): UserRole[] {
    return RoleService.ACCESS_CONFIG[item];
  }
}
