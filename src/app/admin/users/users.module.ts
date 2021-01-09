import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { MaterialComponentsModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { usersRoutes } from './users.routes';

@NgModule({
  declarations: [UsersListComponent, UsersDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(usersRoutes),
    MaterialComponentsModule,
    SharedModule,
  ],
})
export class UsersModule {}
