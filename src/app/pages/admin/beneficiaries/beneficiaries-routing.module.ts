import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeneficiariesComponent } from './beneficiaries.component';
import { BeneficiaryDetailsComponent } from './beneficiary-details/beneficiary-details.component';
import { BeneficiariesListComponent } from './beneficiaries-list/beneficiaries-list.component';

const routes: Routes = [
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
        path: 'list',
        component: BeneficiariesListComponent,
      },
      {
        path: 'new',
        component: BeneficiaryDetailsComponent,
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
export class BeneficiariesRoutingModule { }
