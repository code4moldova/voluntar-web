import { Routes } from '@angular/router';
import { VolunteersDetailsComponent } from './volunteers-details/volunteers-details.component';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';
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
