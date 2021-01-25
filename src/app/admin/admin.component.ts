import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { filter } from 'rxjs/operators';
import { RequestsFacade } from '@requests/requests.facade';
import { AuthService } from '@auth/auth.service';
import {
  getActivityTypesTagsAction,
  getAvailabilitiesTagsAction,
  getOffersTagsAction,
} from '@shared/tags/tags.actions';
import { Store } from '@ngrx/store';
import { AppState } from '@app/app.state';

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
export class AdminComponent implements OnInit {
  constructor(private requestsFacade: RequestsFacade) {}

  ngOnInit() {
    this.requestsFacade.toggleNewRequestsPolling(true);
  }
}
