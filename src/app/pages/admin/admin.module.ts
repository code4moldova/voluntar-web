import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialComponentsModule } from 'src/app/shared/material.module';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@NgModule({
  declarations: [AdminComponent, HeaderComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialComponentsModule,
    SharedModule,
  ],
})
export class AdminModule {}
