import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { AdminComponent } from './admin.component';
import { adminRoutes } from './admin.routes';
import { MaterialComponentsModule } from '@shared/material.module';
import { HeaderComponent } from './shared/header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    MaterialComponentsModule,
    SharedModule,
  ],
})
export class AdminModule {}
