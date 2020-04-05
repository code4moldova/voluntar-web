import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getZonesAction } from '@store/requests-store/actions';
import {
  getActivityTypesTagsAction,
  getAgesTagsAction,
  getAvailabilitiesTagsAction,
  getTeamsTagsAction,
  getOffersTagsAction,
} from '@store/tags-store/actions';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';
  constructor(private store: Store<any>, private authService: AuthService) {
    this.authService.isAuthorized().subscribe((isAutorized) => {
      if (isAutorized) {
        this.store.dispatch(getZonesAction());
        this.store.dispatch(getActivityTypesTagsAction());
        this.store.dispatch(getAgesTagsAction());
        this.store.dispatch(getAvailabilitiesTagsAction());
        this.store.dispatch(getTeamsTagsAction());
        this.store.dispatch(getOffersTagsAction());
      }
    });
  }
}
