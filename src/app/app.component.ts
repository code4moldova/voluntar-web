import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { getZonesAction } from './pages/admin/requests/requests.actions';
import {
  getActivityTypesTagsAction,
  getAgesTagsAction,
  getAvailabilitiesTagsAction,
  getTeamsTagsAction,
  getOffersTagsAction,
} from '@store/tags-store/actions';
import { AuthService } from '@services/auth/auth.service';
import { getUsersAction } from './pages/admin/users/users.actions';

const ICONS = [
  'medicine',
  'deafmute',
  'archived',
  'export',
  'import',
  'plus',
  'map',
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';
  constructor(
    private store: Store<any>,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService
  ) {
    for (const icon of ICONS) {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `../assets/icons/${icon}.svg`
        )
      );
    }

    this.authService.isAuthorized().subscribe((isAutorized) => {
      if (isAutorized) {
        this.store.dispatch(getZonesAction());
        this.store.dispatch(getActivityTypesTagsAction());
        this.store.dispatch(getAgesTagsAction());
        this.store.dispatch(getAvailabilitiesTagsAction());
        this.store.dispatch(getTeamsTagsAction());
        this.store.dispatch(getOffersTagsAction());
        this.store.dispatch(getUsersAction());
      }
    });
  }
}
