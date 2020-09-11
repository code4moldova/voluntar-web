import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MaterialComponentsModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [UsersComponent, UsersListComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialComponentsModule,
    SharedModule,
  ],
})
export class UsersModule {}
