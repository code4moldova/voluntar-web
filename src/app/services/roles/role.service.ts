import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  static ACCESS_CONFIG = {
    users: {
      roles: ['fixer']
    }
  };
  constructor() {}

  static GET_FROM_CONFIG(
    item: keyof typeof RoleService.ACCESS_CONFIG
  ): { roles: string[] } {
    return RoleService.ACCESS_CONFIG[item];
  }
}
