import { Routes } from '@angular/router';
import { ProtectedGuard, PublicGuard } from '@shared/guards';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./public-area/public-area.module').then(
        (m) => m.PublicAreaModule
      ),
  },
  {
    path: 'admin',
    canActivate: [ProtectedGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'login',
    canActivate: [PublicGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
