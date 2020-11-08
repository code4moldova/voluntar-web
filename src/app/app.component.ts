import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { getZonesAction } from '@requests/requests.actions';
import {
  getActivityTypesTagsAction,
  getAgesTagsAction,
  getAvailabilitiesTagsAction,
  getTeamsTagsAction,
  getOffersTagsAction,
} from '@shared/tags/tags.actions';
import { AuthService } from '@auth/auth.service';
import { getUsersAction } from '@users/users.actions';
import { AppState } from '@app/app.state';

const ICONS = [
  'medicine',
  'deafmute',
  'archived',
  'export',
  'import',
  'plus',
  'map',
] as const;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';
  constructor(
    private store: Store<AppState>,
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

    this.authService.isAuthorized().subscribe((isAuthorized) => {
      if (isAuthorized) {
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
