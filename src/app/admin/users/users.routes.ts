import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UserResolverService } from '@users/shared/user-resolver.service';

export const usersRoutes: Routes = [
  {
    path: '',
    component: UsersListComponent,
  },
  {
    path: ':id',
    component: UsersDetailsComponent,
  },
  {
    path: ':id/edit',
    component: UsersEditComponent,
    resolve: {
      user: UserResolverService,
    },
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
