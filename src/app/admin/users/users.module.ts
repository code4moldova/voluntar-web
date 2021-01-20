import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { MaterialComponentsModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { usersRoutes } from './users.routes';
import { UsersCreateComponent } from './users-create/users-create.component';
import { TranslateModule } from '@ngx-translate/core';
import { UsersEditComponent } from './users-edit/users-edit.component';

@NgModule({
  declarations: [
    UsersListComponent,
    UsersDetailsComponent,
    UsersCreateComponent,
    UsersEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(usersRoutes),
    MaterialComponentsModule,
    SharedModule,
    TranslateModule,
  ],
})
export class UsersModule {}
