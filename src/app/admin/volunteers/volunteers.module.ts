import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';
import { VolunteersDetailsComponent } from './volunteers-details/volunteers-details.component';
import { MaterialComponentsModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';
import { VolunteerModalInfoComponent } from './shared/volunteer-modal-info/volunteer-modal-info.component';
import { NgxMaskModule } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { volunteersRoutes } from './volunteers.routes';
import { VolunteersCreateComponent } from './volunteers-create/volunteers-create.component';
import { TranslateModule } from '@ngx-translate/core';
import { RoleComponent } from './shared/role/role.component';
import { RoleTitlePipe } from './shared/role-title.pipe';

@NgModule({
  declarations: [
    VolunteersListComponent,
    VolunteersDetailsComponent,
    VolunteerModalInfoComponent,
    VolunteersCreateComponent,
    RoleComponent,
    RoleTitlePipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(volunteersRoutes),
    MaterialComponentsModule,
    SharedModule,
    NgxMaskModule.forChild(),
    TranslateModule,
  ],
})
export class VolunteersModule {}
