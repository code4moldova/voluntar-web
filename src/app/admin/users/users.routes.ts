import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const usersRoutes: Routes = [
  {
    path: 'details/:id',
    component: UserDetailsComponent,
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
