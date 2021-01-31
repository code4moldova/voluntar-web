import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthFacade } from '@auth/auth.facade';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRole } from '@users/shared/user-role';

@Injectable({
  providedIn: 'root',
})
export class RolesGuard implements CanActivate {
  constructor(
    private userFacade: AuthFacade,
    private snackBar: MatSnackBar,
    private route: Router,
  ) {}
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.userFacade.userRoles$.pipe(
      map((roles: UserRole[]) => {
        const routeRoles: UserRole[] = next.data.roles;
        const rolesIntersection = roles.some((role) =>
          routeRoles.includes(role),
        );
        if ((routeRoles && !roles) || !rolesIntersection) {
          this.snackBar.open('Not allowed', '', {
            duration: 2000,
          });
          void this.route.navigate(['/demands']);
          return false;
        }
        return rolesIntersection;
      }),
    );
  }
}
