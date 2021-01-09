import { Routes } from '@angular/router';
import { VolunteersDetailsComponent } from './volunteers-details/volunteers-details.component';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';

export const volunteersRoutes: Routes = [
  {
    path: 'details/:id',
    component: VolunteersDetailsComponent,
  },
  {
    path: 'list',
    component: VolunteersListComponent,
  },
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];
