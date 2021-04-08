import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { adminRoutes } from './admin.routes';
import { RouterModule } from '@angular/router';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [RouterModule.forChild(adminRoutes), AdminSharedModule],
})
export class AdminModule {}
