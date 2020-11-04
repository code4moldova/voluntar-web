import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserFacadeService } from '@services/auth/user-facade.service';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root',
})
export class RolesGuard implements CanActivate {
  constructor(
    private userFacade: UserFacadeService,
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
      map((roles) => {
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
