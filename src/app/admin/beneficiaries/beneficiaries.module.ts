import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { BeneficiariesListComponent } from './beneficiaries-list/beneficiaries-list.component';
import { BeneficiaryDetailsComponent } from './beneficiary-details/beneficiary-details.component';
import { BeneficiaryNewComponent } from './beneficiary-new/beneficiary-new.component';
import { BeneficiaryEditComponent } from './beneficiary-edit/beneficiary-edit.component';
import { DisabilityComponent } from './shared/disability/disability.component';
import { DemandStatusComponent } from './shared/demand-status/demand-status.component';
import { DemandTypeComponent } from './shared/demand-type/demand-type.component';
import { BeneficiaryListComponent } from './shared/beneficiary-list/beneficiary-list.component';
import { RouterModule } from '@angular/router';
import { beneficiariesRoutes } from './beneficiaries.routes';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BeneficiariesListComponent,
    BeneficiaryDetailsComponent,
    BeneficiaryNewComponent,
    BeneficiaryEditComponent,
    DisabilityComponent,
    DemandStatusComponent,
    DemandTypeComponent,
    BeneficiaryListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(beneficiariesRoutes),
    MaterialComponentsModule,
    SharedModule,
    NgxMaskModule.forChild(),
    TranslateModule,
  ],
})
export class BeneficiariesModule {}
