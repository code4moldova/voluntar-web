import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getZonesAction } from '@store/requests-store/actions';
import { getActivityTypesTagsAction } from '@store/tags-store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  constructor(private store: Store<any>) {
    this.store.dispatch(getZonesAction());
    this.store.dispatch(getActivityTypesTagsAction());
  }
}
