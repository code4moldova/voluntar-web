import { Routes } from '@angular/router';

import { BeneficiariesComponent } from './beneficiaries.component';
import { BeneficiaryDetailsComponent } from './beneficiary-details/beneficiary-details.component';
import { BeneficiariesListComponent } from './beneficiaries-list/beneficiaries-list.component';
import { BeneficiaryEditComponent } from './beneficiary-edit/beneficiary-edit.component';

export const beneficiariesRoutes: Routes = [
  {
    path: '',
    component: BeneficiariesComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'details/:id',
        component: BeneficiaryDetailsComponent,
      },
      {
        path: 'edit/:id',
        component: BeneficiaryEditComponent,
      },
      {
        path: 'list',
        component: BeneficiariesListComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];
