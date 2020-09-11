import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialComponentsModule } from 'src/app/shared/material.module';
import { SidebarComponent } from 'src/app/layout/sidebar/sidebar.component';
import { HeaderComponent } from 'src/app/layout/header/header.component';

@NgModule({
  declarations: [AdminComponent, HeaderComponent, SidebarComponent],
  imports: [CommonModule, AdminRoutingModule, MaterialComponentsModule],
})
export class AdminModule {}
