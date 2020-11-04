import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { RequestsComponent } from './requests.component';
import { DelayGuard } from '@shared/guards';

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsRoutingModule {}
