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
import { BeneficiaryListComponent } from './shared/beneficiary-list/beneficiary-list.component';
import { RouterModule } from '@angular/router';
import { beneficiariesRoutes } from './beneficiaries.routes';
import { TranslateModule } from '@ngx-translate/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';

@NgModule({
  declarations: [
    BeneficiariesListComponent,
    BeneficiaryDetailsComponent,
    BeneficiaryNewComponent,
    BeneficiaryEditComponent,
    DisabilityComponent,
    BeneficiaryListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(beneficiariesRoutes),
    MaterialComponentsModule,
    SharedModule,
    NgxMaskModule.forChild(),
    TranslateModule,
    AdminSharedModule,
  ],
})
export class BeneficiariesModule {}
