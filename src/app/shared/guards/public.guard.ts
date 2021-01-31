import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isAuthorized().pipe(
      map((isAuthorized) => {
        if (isAuthorized) {
          void this.router.navigateByUrl('/admin');
          return false;
        }
        return true;
      })
    );
  }
}
