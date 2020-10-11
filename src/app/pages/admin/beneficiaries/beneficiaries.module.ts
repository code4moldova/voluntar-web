import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

import { BeneficiariesComponent } from './beneficiaries.component';
import { BeneficiariesRoutingModule } from './beneficiaries-routing.module';
import { BeneficiariesListComponent } from './beneficiaries-list/beneficiaries-list.component';
import { BeneficiaryDetailsComponent } from './beneficiary-details/beneficiary-details.component';
import { BeneficiaryNewComponent } from './beneficiary-new/beneficiary-new.component';
import { ZoneTitlePipe } from '../../../zone-title.pipe';
import { BeneficiaryEditComponent } from './beneficiary-edit/beneficiary-edit.component';
import { SpecialConditionTitlePipe } from '../../../special-condition-title.pipe';
import { DisabilityComponent } from '@shared/disability/disability.component';

@NgModule({
  declarations: [
    BeneficiariesComponent,
    BeneficiariesListComponent,
    BeneficiaryDetailsComponent,
    BeneficiaryNewComponent,
    ZoneTitlePipe,
    SpecialConditionTitlePipe,
    BeneficiaryEditComponent,
    DisabilityComponent,
  ],
  imports: [
    CommonModule,
    BeneficiariesRoutingModule,
    MaterialComponentsModule,
    SharedModule,
    NgxMaskModule.forChild(),
  ],
})
export class BeneficiariesModule {}
