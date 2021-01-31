import { Routes } from '@angular/router';
import { VolunteersDetailsComponent } from './volunteers-details/volunteers-details.component';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';
import { VolunteerResolver } from './shared/volunteer.resolver';
import { VolunteersEditComponent } from './volunteers-edit/volunteers-edit.component';

export const volunteersRoutes: Routes = [
  {
    path: '',
    component: VolunteersListComponent,
  },
  {
    path: ':id',
    component: VolunteersDetailsComponent,
    resolve: {
      volunteer: VolunteerResolver,
    },
  },
  {
    path: ':id/edit',
    component: VolunteersEditComponent,
    resolve: {
      volunteer: VolunteerResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
