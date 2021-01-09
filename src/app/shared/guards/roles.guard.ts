import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthFacade } from '@auth/auth.facade';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRole } from '@users/shared/user-role';
// import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root',
})
export class RolesGuard implements CanActivate {
  constructor(
    private userFacade: AuthFacade,
    private snakBar: MatSnackBar,
    private route: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userFacade.userRoles$.pipe(
      map((roles: UserRole[]) => {
        const routeConfig = next.data;
        const rolesIntersection = roles.some((role) =>
          routeConfig.roles.includes(role)
        );
        if ((routeConfig && !roles) || !rolesIntersection) {
          this.snakBar.open('Not allowed', '', {
            duration: 2000,
          });
          this.route.navigate(['/requests']);
          return false;
        }
        return rolesIntersection;
      })
    );
  }
}
