import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteersComponent } from './volunteers.component';
import { VolunteersRoutingModule } from './volunteers-routing.module';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';
import { VolunteersDetailsComponent } from './volunteers-details/volunteers-details.component';
import { MaterialComponentsModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';
import { PhoneMaskDirective } from '@shared/directives/phone-mask.directive';
import { VolunteerModalInfoComponent } from './volunteer-modal-info/volunteer-modal-info.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    VolunteersComponent,
    VolunteersListComponent,
    VolunteersDetailsComponent,
    PhoneMaskDirective,
    VolunteerModalInfoComponent,
  ],
  imports: [
    CommonModule,
    VolunteersRoutingModule,
    MaterialComponentsModule,
    SharedModule,
    NgxMaskModule.forChild(),
  ],
})
export class VolunteersModule {}
