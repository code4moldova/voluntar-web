import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
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
      )
    ])
  ]
})
export class AdminComponent implements OnInit {
  @ViewChild(MatSidenav) drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 1200px)')
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<any>,
    private router: Router
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        filter((e: NavigationEnd) => e.urlAfterRedirects !== '/login')
      )
      .subscribe(event => {
        console.log(event);
      });
  }

  ngOnInit() {}

  close(reson: string) {
    this.drawer.close();
  }

  onToggle() {
    this.drawer.toggle();
  }
}
