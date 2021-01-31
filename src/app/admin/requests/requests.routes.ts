import { Routes } from '@angular/router';
import { DemandDetailsComponent } from './demand-details/demand-details.component';
import { RequestsListComponent } from './demands-list/demands-list.component';

export const requestsRoutes: Routes = [
  {
    path: 'details/:id',
    component: DemandDetailsComponent,
  },
  {
    path: 'list',
    component: RequestsListComponent,
  },
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];
