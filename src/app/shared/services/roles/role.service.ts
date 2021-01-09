import { Injectable } from '@angular/core';
import { UserRole } from '@users/shared/user-role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  static ACCESS_CONFIG = {
    users: [UserRole.administrator],
    requests: [UserRole.administrator, UserRole.operator, UserRole.coordinator],
    beneficiaries: [UserRole.administrator, UserRole.coordinator],
    volunteers: [UserRole.administrator, UserRole.coordinator],
  };

  static getPageRoles(
    item: keyof typeof RoleService.ACCESS_CONFIG
  ): UserRole[] {
    return RoleService.ACCESS_CONFIG[item];
  }
}
