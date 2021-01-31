import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorage } from '@shared/token-storage.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProtectedGuard implements CanActivate {
  constructor(private tokenStorage: TokenStorage, private router: Router) {}
  canActivate(): Observable<boolean | UrlTree> {
    return this.tokenStorage.getAccessToken().pipe(
      map((token) => {
        if (Boolean(token)) {
          return true;
        }
        void this.router.navigate(['/login']);
        return false;
      }),
    );
  }
}
