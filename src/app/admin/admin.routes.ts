import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RolesGuard } from '@shared/guards';
import { UserRole } from '@users/shared/user-role';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'beneficiaries',
        data: {
          roles: [UserRole.administrator, UserRole.coordinator],
        },
        canActivate: [RolesGuard],
        loadChildren: () =>
          import('./beneficiaries/beneficiaries.module').then(
            (m) => m.BeneficiariesModule
          ),
      },
      {
        path: 'volunteers',
        data: {
          roles: [UserRole.administrator, UserRole.coordinator],
        },
        canActivate: [RolesGuard],
        loadChildren: () =>
          import('./volunteers/volunteers.module').then(
            (m) => m.VolunteersModule
          ),
      },
      {
        path: 'demands',
        data: {
          roles: [
            UserRole.administrator,
            UserRole.operator,
            UserRole.coordinator,
          ],
        },
        canActivate: [RolesGuard],
        loadChildren: () =>
          import('@requests/demands.module').then((m) => m.DemandsModule),
      },
      {
        path: 'users',
        data: {
          roles: [UserRole.administrator],
        },
        canActivate: [RolesGuard],
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: '**',
        redirectTo: 'demands',
        pathMatch: 'full',
      },
    ],
  },
];
