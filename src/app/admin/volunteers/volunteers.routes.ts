import { Routes } from '@angular/router';
import { VolunteersDetailsComponent } from './volunteers-details/volunteers-details.component';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';
import { UsersEditComponent } from '@users/users-edit/users-edit.component';
import { UserResolverService } from '@users/shared/user-resolver.service';
import { VolunteersEditComponent } from '@volunteers/volunteers-edit/volunteers-edit.component';
import { VolunteerResolverService } from '@volunteers/shared/volunteer-resolver.service';

export const volunteersRoutes: Routes = [
  {
    path: '',
    component: VolunteersListComponent,
  },
  {
    path: ':id',
    component: VolunteersDetailsComponent,
    resolve: {
      volunteer: VolunteerResolverService,
    },
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
