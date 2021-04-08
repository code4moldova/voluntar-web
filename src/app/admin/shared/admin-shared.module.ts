import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandTypeComponent } from '@app/admin/shared/demand-type/demand-type.component';
import { DemandStatusComponent } from '@app/admin/shared/demand-status/demand-status.component';
import { HeaderComponent } from '@app/admin/shared/header/header.component';
import { MaterialComponentsModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { DemandsHistoryComponent } from './demands-history/demands-history.component';

const components = [
  DemandTypeComponent,
  DemandStatusComponent,
  DemandsHistoryComponent,
  HeaderComponent,
];

@NgModule({
  imports: [CommonModule, MaterialComponentsModule, SharedModule, RouterModule],
  exports: [...components],
  declarations: [...components],
})
export class AdminSharedModule {}
