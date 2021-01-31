import { Routes } from '@angular/router';
import { BeneficiaryDetailsComponent } from './beneficiary-details/beneficiary-details.component';
import { BeneficiariesListComponent } from './beneficiaries-list/beneficiaries-list.component';
import { BeneficiaryEditComponent } from './beneficiary-edit/beneficiary-edit.component';

export const beneficiariesRoutes: Routes = [
  {
    path: '',
    component: BeneficiariesListComponent,
  },
  {
    path: ':id',
    component: BeneficiaryDetailsComponent,
  },
  {
    path: ':id/edit',
    component: BeneficiaryEditComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
