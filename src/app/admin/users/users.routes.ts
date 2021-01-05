import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailsComponent } from './users-details/users-details.component';

export const usersRoutes: Routes = [
  {
    path: 'details/:id',
    component: UsersDetailsComponent,
  },
  {
    path: 'list',
    component: UsersListComponent,
  },
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];
