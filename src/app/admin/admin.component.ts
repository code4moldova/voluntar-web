import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { RequestsFacade } from '@requests/requests.facade';

@Component({
  templateUrl: './admin.component.html',
  animations: [
    trigger('show', [
      state(
        'collapsed',
        style({ opacity: '0', top: '40px', visibility: 'hidden' })
      ),
      state(
        'expanded',
        style({ opacity: '1', top: '70px', visibility: 'visible' })
      ),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AdminComponent implements OnInit, OnDestroy {
  destroyComponent$ = new Subject<any>();

  constructor(private router: Router, private requestsFacade: RequestsFacade) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      filter((e: NavigationEnd) => e.urlAfterRedirects !== '/login'),
      takeUntil(this.destroyComponent$)
    );
  }

  ngOnInit() {
    this.requestsFacade.toggleNewRequestsPolling(true);
  }

  ngOnDestroy() {
    this.destroyComponent$.next();
  }
}
