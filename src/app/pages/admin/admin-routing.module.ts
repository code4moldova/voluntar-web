import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'volunteers',
        pathMatch: 'full'
      },
      {
        path: 'volunteers',
        loadChildren: () =>
          import('./volunteers/volunteers.module').then(m => m.VolunteersModule)
      },
      {
        path: 'requests',
        loadChildren: () =>
          import('./requests/requests.module').then(m => m.RequestsModule)
      }
      // {
      //   path: '**',
      //   redirectTo: 'volunteers',
      //   pathMatch: 'full'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
