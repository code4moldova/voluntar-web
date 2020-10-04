import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

import { BeneficiariesComponent } from './beneficiaries.component';
import { BeneficiariesRoutingModule } from './beneficiaries-routing.module';
import { BeneficiariesListComponent } from './beneficiaries-list/beneficiaries-list.component';
import { BeneficiaryDetailsComponent } from './beneficiary-details/beneficiary-details.component';

@NgModule({
  declarations: [
    BeneficiariesComponent,
    BeneficiariesListComponent,
    BeneficiaryDetailsComponent,
  ],
  imports: [
    CommonModule,
    BeneficiariesRoutingModule,
    MaterialComponentsModule,
    SharedModule,
    NgxMaskModule.forChild(),
  ],
})
export class BeneficiariesModule { }
