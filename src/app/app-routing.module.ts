import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedGuard } from './guards/protected.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [ProtectedGuard],
    loadChildren: () =>
      import('./pages/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
