import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MaterialComponentsModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { usersRoutes } from './users.routes';

@NgModule({
  declarations: [UsersListComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(usersRoutes),
    MaterialComponentsModule,
    SharedModule,
  ],
})
export class UsersModule {}
