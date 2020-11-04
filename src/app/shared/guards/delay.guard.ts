import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RequestsFacadeService } from '@services/requests/requests-facade.service';
import { filter, map, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DelayGuard implements CanActivate, CanActivateChild {
  constructor(private requestFacade: RequestsFacadeService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.requestFacade.zones$.pipe(
      filter((z) => {
        return z.length > 0;
      }),
      map((z) => {
        return true;
      })
    );
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(next, state);
  }
}
