import { Routes } from '@angular/router';
import { RequestsListComponent } from './demands-list/demands-list.component';

export const requestsRoutes: Routes = [
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
