import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';
import { VolunteersDetailsComponent } from './volunteers-details/volunteers-details.component';
import { MaterialComponentsModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { volunteersRoutes } from './volunteers.routes';
import { VolunteersCreateComponent } from './volunteers-create/volunteers-create.component';
import { VolunteerRoleComponent } from './shared/volunteer-role/volunteer-role.component';
import { VolunteersEditComponent } from './volunteers-edit/volunteers-edit.component';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';

@NgModule({
  declarations: [
    VolunteersListComponent,
    VolunteersDetailsComponent,
    VolunteersCreateComponent,
    VolunteerRoleComponent,
    VolunteersEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(volunteersRoutes),
    MaterialComponentsModule,
    SharedModule,
    AdminSharedModule,
    NgxMaskModule.forChild(),
  ],
})
export class VolunteersModule {}
