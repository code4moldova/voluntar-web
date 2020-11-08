import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteersComponent } from './volunteers.component';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';
import { VolunteersDetailsComponent } from './volunteers-details/volunteers-details.component';
import { MaterialComponentsModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';
import { VolunteerModalInfoComponent } from './shared/volunteer-modal-info/volunteer-modal-info.component';
import { NgxMaskModule } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { volunteersRoutes } from './volunteers.routes';

@NgModule({
  declarations: [
    VolunteersComponent,
    VolunteersListComponent,
    VolunteersDetailsComponent,
    VolunteerModalInfoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(volunteersRoutes),
    MaterialComponentsModule,
    SharedModule,
    NgxMaskModule.forChild(),
  ],
})
export class VolunteersModule {}
