import { Routes } from '@angular/router';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { RequestsComponent } from './requests.component';
import { DelayGuard } from '@shared/guards';

export const requestsRoutes: Routes = [
  {
    path: '',
    component: RequestsComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'details/:id',
        canActivateChild: [DelayGuard],
        component: RequestDetailsComponent,
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
    ],
  },
];
