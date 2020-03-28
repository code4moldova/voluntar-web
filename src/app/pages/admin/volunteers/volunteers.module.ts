import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteersComponent } from './volunteers.component';
import { VolunteersRoutingModule } from './volunteers-routing.module';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';
import { VolunteersDetailsComponent } from './volunteers-details/volunteers-details.component';
import { MaterialComponentsModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    VolunteersComponent,
    VolunteersListComponent,
    VolunteersDetailsComponent
  ],
  imports: [
    CommonModule,
    VolunteersRoutingModule,
    MaterialComponentsModule,
    SharedModule
  ]
})
export class VolunteersModule {}
