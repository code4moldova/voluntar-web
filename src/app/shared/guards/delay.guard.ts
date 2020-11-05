import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RequestsFacade } from '@requests/requests.facade';
import { filter, map, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DelayGuard implements CanActivate, CanActivateChild {
  constructor(private requestFacade: RequestsFacade) {}
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
