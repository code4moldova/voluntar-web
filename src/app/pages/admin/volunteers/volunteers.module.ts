import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteersComponent } from './volunteers.component';
import { VolunteersRoutingModule } from './volunteers-routing.module';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';
import { VolunteersDetailsComponent } from './volunteers-details/volunteers-details.component';

@NgModule({
  declarations: [VolunteersComponent, VolunteersListComponent, VolunteersDetailsComponent],
  imports: [CommonModule, VolunteersRoutingModule]
})
export class VolunteersModule {}
