import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RoleService } from '@services/roles/role.service';
import { RolesGuard } from '@shared/guards';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'requests',
        pathMatch: 'full',
      },
      {
        path: 'beneficiaries',
        data: {
          ...RoleService.GET_FROM_CONFIG('beneficiaries'),
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
          ...RoleService.GET_FROM_CONFIG('volunteers'),
        },
        canActivate: [RolesGuard],
        loadChildren: () =>
          import('./volunteers/volunteers.module').then(
            (m) => m.VolunteersModule
          ),
      },
      {
        path: 'requests',
        data: {
          ...RoleService.GET_FROM_CONFIG('requests'),
        },
        canActivate: [RolesGuard],
        loadChildren: () =>
          import('./requests/requests.module').then((m) => m.RequestsModule),
      },
      {
        path: 'users',
        data: {
          ...RoleService.GET_FROM_CONFIG('users'),
        },
        canActivate: [RolesGuard],
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      // {
      //   path: '**',
      //   redirectTo: 'volunteers',
      //   pathMatch: 'full'
      // }
    ],
  },
];
