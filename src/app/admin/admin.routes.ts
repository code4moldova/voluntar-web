import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RoleService } from '@shared/services/roles/role.service';
import { RolesGuard } from '@shared/guards';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'beneficiaries',
        data: {
          roles: RoleService.getPageRoles('beneficiaries'),
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
          roles: RoleService.getPageRoles('volunteers'),
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
          roles: RoleService.getPageRoles('requests'),
        },
        canActivate: [RolesGuard],
        loadChildren: () =>
          import('./requests/requests.module').then((m) => m.RequestsModule),
      },
      {
        path: 'users',
        data: {
          roles: RoleService.getPageRoles('users'),
        },
        canActivate: [RolesGuard],
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: '**',
        redirectTo: 'requests',
        pathMatch: 'full',
      },
    ],
  },
];
